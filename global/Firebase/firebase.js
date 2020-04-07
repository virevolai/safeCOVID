import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import { Platform } from 'react-native'
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, CURRENT_SCHEMA_VERSION } from 'react-native-dotenv'

// MEH: This class is too big (JAVAesque). 
// Can it be broken up in a nice way but provide the same interface? 
class Firebase {

	constructor() {
		firebase.initializeApp({
			apiKey: API_KEY,
			authDomain: AUTH_DOMAIN,
			databaseURL: DATABASE_URL,
			projectId: PROJECT_ID,
			storageBucket: STORAGE_BUCKET,
			messagingSenderId: MESSAGING_SENDER_ID,
			appId: APP_ID,
		})
		console.log('Firebase::constructor: Initialized')
	}

	// ----- AUTH
	checkUserAuth = userFn =>
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
					firebase.auth().signInAnonymously().then((anonUser) => {
						const { uid } = anonUser.user
						console.log('Firebase::checkUserAuth: uid is ', uid)
						const { OS, Version } = Platform
						this.createNewDeviceUser({ uid, OS, Version })
					})
			}
			userFn(user)
		})

	signOut = () =>
		firebase.auth().signOut()

	// firestore DB
	// ----- SCHEMA
	get currentSchema() {
		return firebase
			.firestore()
			.collection('schemas')
			.doc(CURRENT_SCHEMA_VERSION)
	}

	// ----- DEVICE USERS
	get deviceUsers() {
		return this.currentSchema
			.collection('device_users')
	}

	// This should only be called AFTER a NEW login has been authenticated
	createNewDeviceUser = user => 
		this.deviceUsers
			.doc(user.uid)
			.set(this.appendTs(user))

	get currentDeviceUser() {
		return this.deviceUsers
			.doc(this.currentUser.uid)
	}

	// ----- MOVEMENT
	get getMovement() {
		return this.currentDeviceUser
			.collection('movement')
	}

	createMovementEntry = (mvmt) =>
		this.getMovement
			.add(this.appendTs(mvmt))


	// ----- HELPERS

	get timestamp() {
		return firebase.firestore.FieldValue.serverTimestamp()
	}

	appendTs = (data) => {
		var ret = data
		ret.added_ts = this.timestamp
		return ret
	}
	
}

Firebase.shared = new Firebase()
export default Firebase

import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import { Platform } from 'react-native'
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, CURRENT_SCHEMA_VERSION } from 'react-native-dotenv'

// MEH: This class is too big (JAVAesque). 
// Can it be broken up in a nice way but provide the same interface? 
class Firebase {

	config = {
		COLLECT_BLE: true,
		BLE_SCAN_TIMEOUT: 5000,
		COLLECT_LOC: true,
		LOC_MAX_AGE: 1000,
		LOC_TIMEOUT: 20000,
		COLLECT_MVMT: true,
	}

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
		this.getConfig()
		console.log('Firebase::constructor: Initialized')
	}

	// ----- AUTH
	checkUserAuth = userFn =>
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
					firebase.auth().signInAnonymously()
						.then((anonUser) => {
							const { uid } = anonUser.user
							console.log('Firebase::checkUserAuth: uid is ', uid)
							const { OS, Version } = Platform
							this.createNewDeviceUser({ uid, OS, Version })
								.then(() =>
									userFn(anonUser)
								)
						})
			} else {
				userFn(user)
			}
		})

	signOut = () =>
		firebase.auth().signOut()

	get currentUser() {
		return firebase.auth().currentUser
	}

	// firestore DB
	// ----- SCHEMA
	get currentSchema() {
		return firebase
			.firestore()
			.collection('schemas')
			.doc(CURRENT_SCHEMA_VERSION)
	}

	// ----- DEVICE USERS
	getConfig = () =>
		this.currentSchema
			.collection('config')
			.doc('0')
			.get()
			.then(async (doc) => {
				this.config = await doc.data()
				console.log('Firebase::getConfig: config is now ', this.config)
			})

	// ----- DEVICE USERS
	get deviceUsers() {
		return this.currentSchema
			.collection('device_users')
	}

	userScore = (fn) =>
		this.currentDeviceUser
			.get()
			.then((doc) => {
				if (doc.exists) {
					const data = doc.data()
					fn({ score: data.score, scoredAt: data.scored_ts })
				}
			})

	// This should only be called AFTER a NEW login has been authenticated
	createNewDeviceUser = user => 
		this.deviceUsers
			.doc(user.uid)
			.set(this.appendTs(user))

	get currentDeviceUser() {
		console.log('currentDeviceUser: currentUser uid is ', this.currentUser.uid)
		return this.deviceUsers
			.doc(this.currentUser.uid)
	}

	// ----- MOVEMENT
	get getMovement() {
		return this.currentDeviceUser
			.collection('movement')
	}

	createMovementEntry = (mvmt) => {
		console.log('Firebase::createMovementEntry: Trying to insert', mvmt)
		return this.getMovement
			.add(mvmt)
			.catch((e) => 
				console.log('Firebase::createMovementEntry: Got error ', { e })
			)
	}

	// ----- LOCATION 
	get getLocation() {
		return this.currentDeviceUser
			.collection('location')
	}

	createLocationEntry = (loc) => {
		console.log('Firebase::createLocationEntry: Trying to insert', loc)
		return this.getLocation
			.add(loc)
			.catch((e) => 
				console.log('Firebase::createLocationEntry: Got error ', { e })
			)
	}

	// ----- BLUETOOTH
	get getBluetooth() {
		return this.currentDeviceUser
			.collection('bluetooth')
	}

	createBluetoothEntry = (devices) =>
		this.getBluetooth
			.add(this.appendTs(devices))


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

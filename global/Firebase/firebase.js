import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import { Platform } from 'react-native'
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, CURRENT_SCHEMA_VERSION } from 'react-native-dotenv'


class WaitMutex {

	constructor(ms) {
		this.ms = ms
		this.isWaiting = false
	}

	shouldRun = (fn) => {
		if (!this.isWaiting) {
			setTimeout(
				() => {
					this.isWaiting = false
					console.log('shouldRun:: Tired of waiting ', this.isWaiting)
				}, 
				this.ms
			)
			this.isWaiting = true
			fn()
		}
		return !this.isWaiting
	}
}

// MEH: This class is too big (JAVAesque). 
// Can it be broken up in a nice way but provide the same interface? 
class Firebase {

	config = {
		isFirstTime: true,
		COLLECT_BLE: true,
		BLE_SCAN_TIMEOUT: 5000,
		COLLECT_LOC: true,
		LOC_CHECK_MS: 10000,
		LOC_MAX_AGE: 1000,
		LOC_TIMEOUT: 20000,
		COLLECT_MVMT: true,
		MVMT_CHECK_MS: 10000,
		MVMT_SPEED_THRESH: 20,
	}

	locale = {"countryCode": "US", "languageCode": "en", "languageTag": "en-US"}
	isLocaleSent = false

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
			this.config.isFirstTime = false
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

	// ----- CONFIG
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

	// ----- LOCALE
	get getLocale() {
		return this.currentDeviceUser
			.collection('locale')
	}

	createLocaleEntry = (locale) => {
		if (!this.isLocaleSent) {
			console.log('Firebase::createLocaleEntry: Trying to insert', locale)
			this.locale = locale
			return this.getLocale
				.add(this.appendTs(locale))
				.then(() =>
						this.isLocaleSent = true
				)
				.catch((e) => 
					console.log('Firebase::createLocaleEntry: Got error ', { e })
				)
		} else {
			return
		}
	}

	// MEH -- Creating a CMS.. bad idea
	// ----- VIDEOS 
	get getVideos() {
		return this.currentSchema
			.collection('videos')
	}

	getVideo = (id, locale, callback) =>
		this.getVideos
			// .doc(id)
			.doc('dBWebB12OfDVgTOuzaAg') // TODO: Remove this
			.get()
			.then((doc) => {
				const data = doc.data()
				let video = null
				if (locale in data) {
					video = data[locale]
				} else {
					video = data['en-US']
				}
				console.log('Firebase::getVideo: ', locale, data, ' => ', video)
				callback(video)
			})
			.catch(async (e) =>
				console.log('Firebase::getVideo: ', e)
			)



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

	createMovementEntryMutexed = (mvmt) => {
		if (!this.mvmtMutex) {
			console.log('Firebase::createMovementEntryMutexed: new')
			this.mvmtMutex = new WaitMutex(this.config.MVMT_CHECK_MS)
		}
		this.config.COLLECT_MVMT && 
			this.mvmtMutex.shouldRun(() => this.createMovementEntry(mvmt))
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

	createLocationEntryMutexed = (loc) => {
		if (!this.locMutex) {
			console.log('Firebase::createLocationEntryMutexed: new')
			this.locMutex = new WaitMutex(this.config.LOC_CHECK_MS)
		}
		this.config.COLLECT_LOC && 
			this.locMutex.shouldRun(() => this.createLocationEntry(loc))
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

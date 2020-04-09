import React, { Component } from 'react';
import { View, Button, Image, Animated } from 'react-native';
import { Text } from 'react-native-elements';
import { Colors, textStyle } from './global/styles';
import { withFirebaseHOC } from './global/Firebase'

const DURATION=2000

class Initial extends Component {

	state = {
		fadeValue: new Animated.Value(0)
	}

	_start = () => {
		Animated.timing(this.state.fadeValue, {
			toValue: 1,
			duration: DURATION,
		}).start()
	}

	performTimeConsumingTask = async() => {
		return new Promise((resolve) =>
			setTimeout(
				() => { resolve('result') },
				DURATION
			)
		)
	}

	componentDidMount = async () => {


		try {
			// previously
			// this.loadLocalAsync()

			this._start()
			await this.performTimeConsumingTask()

			await this.props.firebase.shared.checkUserAuth(user => {
				if (user && user.displayName) {
					// if the user has previously logged in
					const { displayName, uid } = user 
					console.log(`InitialScreen::componentDidMount: ${uid} => ${displayName}`)
					this.props.navigation.navigate('App')
				} else {
					// if the user has previously signed out from the app
					this.props.navigation.navigate('Auth')
				}
			})
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return(
			<View 
				style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.Pbackground}}
			>
				<Image
					style={{width: 200, height: 200}}
					source={require('./img/virevol_ai_app_logo.png')}
				/>
				<Animated.View
					style={{
						opacity: this.state.fadeValue
					}}
				>
					<Text 
						style={[
							textStyle.normal,
							{ 'fontSize': 20 },
						]}
					>
						your concierge and gossip
					</Text>
				</Animated.View>
			</View>
		)
	}
}

export default withFirebaseHOC(Initial)

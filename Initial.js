import React, { Component } from 'react';
import { View, Text, Button, Image, Animated } from 'react-native';
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

			this._start()
			await this.performTimeConsumingTask()

			await this.props.firebase.shared.checkUserAuth(user => {
				if (user && user.uid) {
					console.log(`InitialScreen::componentDidMount: uid = ${user.uid}`)
					// this.props.navigation.navigate('App')
				} else {
					// if the user has previously signed out from the app
					console.log('InitialScreen::componentDidMount: Could not connect')
					// this.props.navigation.navigate('Auth')
				}
			})
		} catch (error) {
			console.log('Initial::componentDidMount:', error)
		}
	}

	render() {
		return(
			<View 
				style={{flex:1, justifyContent: 'center', alignItems: 'center' }}
			>
				<Image
					style={{width: 200, height: 200}}
					source={require('./img/safeCOVID.png')}
				/>
				<Animated.View
					style={{
						opacity: this.state.fadeValue
					}}
				>
					<Text 
						style={[
							// textStyle.normal,
							{ 'fontSize': 20 },
						]}
					>
						safe together
					</Text>
				</Animated.View>
			</View>
		)
	}
}

export default withFirebaseHOC(Initial)

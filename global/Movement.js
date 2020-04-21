import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert, Platform } from 'react-native'
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors"
import { map, filter } from "rxjs/operators"
import { textStyle } from '../global/styles/'
import { withFirebaseHOC } from '../global/Firebase'

class Movement extends Component {

	state = { isMoving: false }

	constructor(props) {
		super(props)
		// setUpdateIntervalForType(SensorTypes.Accelerometer, 400); // defaults to 100ms

		const { COLLECT_MVMT, MVMT_SPEED_THRESH } = props.firebase.shared.config
		const subscription = accelerometer
			.pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > MVMT_SPEED_THRESH))
			.subscribe(
				speed => {
					// console.log(`Movement::subscription: Phone is moving with ${speed}`)
					// TODO: We eventually do not want to log this.
					// We just need to train some data on prompting folk to wear a mask when they get out of the car
					props.firebase.shared.createMovementEntryMutexed({ speed })
					this.setState({ isMoving: true })
				},
				error => {
					console.log("The sensor is not available")
				}
			)

		setTimeout(() => {
			() => {
				// If it's the last subscription to accelerometer it will stop polling in the native API
				subscription.unsubscribe()
				this.setState({ isMoving: false })
			}
		}, 1000)

	}
	
	render() {
		return (
			<View>
				{ this.state.isMoving && (
					<Text style={textStyle.normal}> 🚗 </Text>
				)}
			</View>
		)
	}

}

export default withFirebaseHOC(Movement)

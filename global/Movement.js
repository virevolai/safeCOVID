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

	constructor() {
		super()
		// setUpdateIntervalForType(SensorTypes.Accelerometer, 400); // defaults to 100ms

		const subscription = accelerometer
			.pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > 20))
			.subscribe(
				speed => {
					console.log(`Movement::subscriotion: Phone is moving with ${speed}`)
					this.props.firebase.shared.config.COLLECT_MVMT &&
						this.props.firebase.shared.createMovementEntry(accelerometer)
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

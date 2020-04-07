import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert, Platform } from 'react-native';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";
import { map, filter } from "rxjs/operators";
import { withFirebaseHOC } from './global/Firebase'

class Movement extends Component {

	constructor() {
		super()
		// setUpdateIntervalForType(SensorTypes.Accelerometer, 400); // defaults to 100ms

		const subscription = accelerometer
			.pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > 20))
			.subscribe(
				speed => console.log(`You moved your phone with ${speed}`),
				error => {
					console.log("The sensor is not available");
				}
			);

		setTimeout(() => {
			// If it's the last subscription to accelerometer it will stop polling in the native API
			subscription.unsubscribe();
		}, 1000);

	}
	
	render() {
		return (
			<View>
				<Text> Who is this person? </Text>
			</View>
		)
	}

}

export default withFirebaseHOC(Movement)

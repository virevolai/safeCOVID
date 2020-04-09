import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert, Platform } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import { LOCTIMEOUT, LOCMAXAGE } from 'react-native-dotenv'
import { withFirebaseHOC } from '../global/Firebase'

const LOCHIACCURACY = true

class Location extends Component {

	state = {
		initialPosition: 'unknown',
		lastPosition: 'unknown',
	}

	watchID: ?number = null

	componentDidMount = () => {
		if (Platform.OS === 'ios') {
			Geolocation.setRNConfiguration({ authorizationLevel: 'always' })
		}
		Geolocation.getCurrentPosition(
			position => {
				const initialPosition = JSON.stringify(position)
				this.setState({ initialPosition })
				this.props.firebase.shared.createLocationEntry(position)
			},
			error => Alert.alert('Error', JSON.stringify(error)),
			{
				enableHighAccuracy: LOCHIACCURACY, 
				timeout: parseInt(LOCTIMEOUT), 
				maximumAge: parseInt(LOCMAXAGE)
			},
		)
		this.watchID = Geolocation.watchPosition(position => {
			const lastPosition = JSON.stringify(position)
			this.setState({ lastPosition })
		})
	}

	componentWillUnmount = () =>
		this.watchID != null &&
			Geolocation.clearWatch(this.watchID)

	render() {
		return (
			<View>
				<Text>
					<Text style={styles.title}>Initial position: </Text>
					{this.state.initialPosition}
				</Text>
				<Text>
					<Text style={styles.title}>Current position: </Text>
					{this.state.lastPosition}
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	}
})

export default withFirebaseHOC(Location)

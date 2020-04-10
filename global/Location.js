import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert, Platform } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import helpers from '../global/helpers'
import { textStyle } from '../global/styles/'
import { withFirebaseHOC } from '../global/Firebase'

const LOCHIACCURACY = true

class Location extends Component {

	state = {
		initialPosition: null,
		distance: null,
	}

	watchID: ?number = null

	componentDidMount = () => {
		if (Platform.OS === 'ios') {
			Geolocation.setRNConfiguration({ authorizationLevel: 'always' })
		}
		Geolocation.getCurrentPosition(
			position => {
				this.setState({ initialPosition: position })
				this.props.firebase.shared.createLocationEntry(position)
			},
			error => Alert.alert('Error', JSON.stringify(error)),
			{
				enableHighAccuracy: LOCHIACCURACY, 
				timeout: parseInt(this.props.firebase.shared.config.LOC_TIMEOUT), 
				maximumAge: parseInt(this.props.firebase.shared.config.LOC_MAX_AGE)
			},
		)
		this.watchID = Geolocation.watchPosition(p2 => {
			this.setState({ currentPosition: JSON.stringify(p2) })
			const { initialPosition } = this.state

			// console.log('Distance between ', {initialPosition}, ' and ', {p2} )

			if (initialPosition && p2) {
				const { coords: c1 } = initialPosition
				const { coords: c2 } = p2
				// console.log('c1 = ', c1, ', c2 = ', c2)
				const d = helpers.geo_distance(
					c1.latitude, c1.longitude,
					c2.latitude, c2.longitude
				)
				// console.log('Distance is ', d)
				this.setState({ distance: d })
				if (d > 0.001 && this.props.firebase.shared.config.COLLECT_LOC) {
					console.log('Location::componentDidMount: Moved past the threshold')
					this.props.firebase.shared.createLocationEntry(position)
				}
			}

		})
	}

	componentWillUnmount = () =>
		this.watchID != null &&
			Geolocation.clearWatch(this.watchID)

	render() {
		return (
			<>
				<Text style={textStyle.normal}>
					Location alerts on
				</Text>
			</>
		)
	}
}

export default withFirebaseHOC(Location)

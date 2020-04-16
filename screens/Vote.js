import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import * as RNLocalize from "react-native-localize"
import BleCheck from '../global/BleCheck'
// import Location from '../global/Location'
import Movement from '../global/Movement'
import Score from '../global/Score'
import { Colors } from '../global/styles/'
import { withFirebaseHOC } from '../global/Firebase'

class Vote extends Component {

	state = { video : null }

	componentDidMount (props) {
		const locales = RNLocalize.getLocales()
		console.log('Vote::constructor: locales is ', locales)
		this.props.firebase.shared.getVideo(
			'Tutorial',
			locales[0].languageTag,
			(video) => {
				console.log('Vote::componentDidMount: video is ', video)
				this.setState({ video })
			}
		)
	}

	render() {
		const { video } = this.state
		console.log('Vote::render: Init')
		return (
			<View style={styles.container}>
				<Score />
				<Button
					title="Tutorial"
					onPress={() => this.props.navigation.navigate('Tutorial', { video })}
					disabled={!video}
				/>
				<BleCheck />
				<Movement />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.Pbackground,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default withFirebaseHOC(Vote)

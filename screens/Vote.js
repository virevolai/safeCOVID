import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import * as RNLocalize from "react-native-localize"
import BleCheck from '../global/BleCheck'
// import Location from '../global/Location'
import Movement from '../global/Movement'
import Score from '../global/Score'
import { Colors, componentStyle } from '../global/styles/'
import { withFirebaseHOC } from '../global/Firebase'

class Vote extends Component {

	state = { videoTutorial : null, videoMask: null, videoWash: null }

	componentDidMount (props) {
		const locales = RNLocalize.getLocales()
		console.log('Vote::constructor: locales is ', locales)
		this.props.firebase.shared.getVideo(
			'Tutorial',
			locales[0].languageTag,
			(videoTutorial) => {
				console.log('Vote::componentDidMount: videoTutorial is ', videoTutorial)
				this.setState({ videoTutorial })
			}
		)
		this.props.firebase.shared.getVideo(
			'Mask',
			locales[0].languageTag,
			(videoMask) => {
				console.log('Vote::componentDidMount: videoMask is ', videoMask)
				this.setState({ videoMask })
			}
		)
		this.props.firebase.shared.getVideo(
			'Wash',
			locales[0].languageTag,
			(videoWash) => {
				console.log('Vote::componentDidMount: videoWash is ', videoWash)
				this.setState({ videoWash })
			}
		)
	}

	render() {
		const { videoTutorial, videoMask, videoWash } = this.state
		console.log('Vote::render: Init')
		return (
			<View style={componentStyle.container}>
				<Score />
				<BleCheck />
				<Movement />
				<View
					style={componentStyle.footer}
				>
					<Button
						title="Tutorial"
						onPress={() => this.props.navigation.navigate('Tutorial', { videoTutorial })}
						disabled={!videoTutorial}
					/>
					<Button
						title="Masks"
						onPress={() => this.props.navigation.navigate('Tutorial', { videoMask })}
						disabled={!videoMask}
					/>
					<Button
						title="Wash hands"
						onPress={() => this.props.navigation.navigate('Tutorial', { videoWash })}
						disabled={!videoWash}
					/>
				</View>
			</View>
		)
	}
}

export default withFirebaseHOC(Vote)

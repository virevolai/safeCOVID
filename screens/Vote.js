import React, { Component } from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import * as RNLocalize from "react-native-localize"
import Entry from '../global/Entry'
// import Location from '../global/Location'
import Movement from '../global/Movement'
import Score from '../global/Score'
import Btn from '../global/Btn'
import { Colors, componentStyle } from '../global/styles/'
import { withFirebaseHOC } from '../global/Firebase'

class Vote extends Component {

	state = { videoTutorial : null, videoMask: null, videoWash: null, videoSick: null }

	componentDidMount () {
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
		this.props.firebase.shared.getVideo(
			'Sick',
			locales[0].languageTag,
			(videoSick) => {
				console.log('Vote::componentDidMount: videoSick is ', videoSick)
				this.setState({ videoSick })
			}
		)
	}

	onNotify = (covidEvent) =>
		this.props.firebase.shared.createCOVIDEntry(covidEvent)

	render() {
		const { videoTutorial, videoMask, videoWash, videoSick } = this.state
		console.log('Vote::render: Init')
		return (
			<View style={componentStyle.container}>
				<View
					style={componentStyle.header}
				>
					<Btn
						title="Tutorial"
						onPress={() => this.props.navigation.navigate('Tutorial', { video: videoTutorial })}
						disabled={!videoTutorial}
					/>
				</View>
				<Score />
				<Entry />
				<Movement />
				<View
					style={componentStyle.footer}
				>
					<Btn
						title="😷 Mask"
						onPress={() => this.props.navigation.navigate('Tutorial', { video: videoMask })}
						disabled={!videoMask}
					/>
					<Btn
						title="👏 Wash"
						onPress={() => this.props.navigation.navigate('Tutorial', { video: videoWash })}
						disabled={!videoWash}
					/>
					<Btn
						title="🤒 Sick?"
						onPress={() => this.props.navigation.navigate('Sick', { video: videoSick, onNotify: this.onNotify })}
						disabled={!videoSick}
					/>
				</View>
			</View>
		)
	}
}

export default withFirebaseHOC(Vote)

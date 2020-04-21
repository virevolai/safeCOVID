import React, { Component } from 'react'
import { Text, View, } from 'react-native'
import { textStyle } from '../global/styles/'
import { withFirebaseHOC } from '../global/Firebase'

class Score extends Component {

	state = { noScoreMsg: null, score: null, scoredAt: null }

	componentDidMount = () => {
		this.setState({ noScoreMsg: this.props.firebase.shared.config.UNSCORED_MESSAGE_EN || 'Not scored yet, please wait' })
		this.props.firebase.shared.userScore((scoreObj) => {
			const { score, scoredAt } = scoreObj
			this.setState({ score, scoredAt })
		})
	}

	render() {
		const { noScoreMsg, score } = this.state
		return (
			<View style={{ justifyContent: 'center', alignItems: 'center'}}>
				<Text style={textStyle.bold}>
					My current level
				</Text>
				<Text style={textStyle.score}>
					{score || 1}
				</Text>
			</View>
		)
	}
}

export default withFirebaseHOC(Score)

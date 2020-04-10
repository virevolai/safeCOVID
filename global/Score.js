import React, { Component } from 'react'
import { Text, View, } from 'react-native'
import { textStyle } from '../global/styles/'
import { withFirebaseHOC } from '../global/Firebase'

class Score extends Component {

	state = { score: null, scoredAt: null }

	componentDidMount = () => {
		this.props.firebase.shared.userScore((scoreObj) => {
			const { score, scoredAt } = scoreObj
			this.setState({ score, scoredAt })
		})
	}

	render() {
		const { score } = this.state
		return (
			<>
				<Text style={textStyle.bold}>
					My current level
				</Text>
				{ score ? (
					<Text style={textStyle.score}>
						{score}
					</Text>
				) : (
					<Text style={textStyle.bold}>
						Not scored yet
					</Text>
				)}
			</>
		)
	}
}

export default withFirebaseHOC(Score)

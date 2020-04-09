import React, { Component } from 'react'
import { Text, View, } from 'react-native'
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
			<View>
				<Text>
					{score ? score : 'not scored yet'}
				</Text>
			</View>
		)
	}
}

export default withFirebaseHOC(Score)

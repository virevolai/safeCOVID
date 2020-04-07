import React, { Component } from 'react'
import { View, Text, Button } from 'react-native';
import { withFirebaseHOC } from './global/Firebase'

class Login extends Component {

	componentDidMount = async () =>
		await this.props.firebase.shared.checkUserAuth(() => {})

	render() {
		return(
			<View>
				<Button
					title={'logout'}
					onPress={() => this.props.firebase.shared.signOut()}
				/>
				<Text> Boo </Text>
			</View>
		)
	}
}

export default withFirebaseHOC(Login)


import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { withFirebaseHOC } from '../global/Firebase'
import Vote from '../Vote/Vote'
import Login from '../Auth/Login'

const Stack = createStackNavigator()

class AppContainer extends Component {

	state = { isLoggedin: false }

	componentDidMount = async () =>
		await this.props.firebase.shared.checkUserAuth(() =>
			this.setState({ isLoggedin: true })
		)

	render() {
		console.log('AppContainer::render: isLoggedin is ', this.state.isLoggedin)
		return (
			<NavigationContainer>
				{ this.state.isLoggedin ? (
					<Stack.Navigator>
						<Stack.Screen name="Home" component={Vote} />
					</Stack.Navigator>
				) : (
					<Stack.Navigator>
						<Stack.Screen name="Login" component={Login} />
					</Stack.Navigator>
				)}
			</NavigationContainer>
		)
	}
}

export default withFirebaseHOC(AppContainer)

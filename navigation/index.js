import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withFirebaseHOC } from '../global/Firebase'
import Vote from '../screens/Vote'
import Initial from '../screens/Initial'

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
			<SafeAreaProvider>
				<NavigationContainer>
					{ this.state.isLoggedin ? (
						<Stack.Navigator>
							<Stack.Screen name="safeCOVID" component={Vote} />
						</Stack.Navigator>
					) : (
						<Stack.Navigator>
							<Stack.Screen name="Initial" component={Initial} />
						</Stack.Navigator>
					)}
				</NavigationContainer>
			</SafeAreaProvider>
		)
	}
}

export default withFirebaseHOC(AppContainer)

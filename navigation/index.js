import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Colors, textStyle } from '../global/styles'
import * as RNLocalize from "react-native-localize"
import { withFirebaseHOC } from '../global/Firebase'
import Vote from '../screens/Vote'
import Initial from '../screens/Initial'
import Tutorial from '../screens/Tutorial'
import Sick from '../screens/Sick'

const Stack = createStackNavigator()

class AppContainer extends Component {

	constructor(props) {
		super()
		this.state = { isLoggedin: false }

		props.firebase.shared.checkUserAuth(() => {
			setTimeout(() => this.setState({ isLoggedin: true }), 2000)
			const locales = RNLocalize.getLocales()
			console.log(locales)
			this.props.firebase.shared.createLocaleEntry(locales[0])
		})
	}

	render() {
		const { isLoggedin } = this.state

		return (
			<SafeAreaProvider>
				<NavigationContainer>
					{ isLoggedin ? (
						<Stack.Navigator
								screenOptions={{
									headerStyle: {
										backgroundColor: Colors.Primary3,
									},
									headerTintColor: Colors.Pbackground,
									headerTitleStyle: {
										fontWeight: 'bold',
									},
								}}
						>
							<Stack.Screen
								name="safeCOVID" component={Vote}
							/>
							<Stack.Screen
								name="Tutorial" component={Tutorial}
							/>
							<Stack.Screen
								name="Sick" component={Sick}
							/>
						</Stack.Navigator>
					) : (
						<Stack.Navigator>
							<Stack.Screen 
								name="Initial" component={Initial} 
								options={{ headerShown: false }} 
							/>
						</Stack.Navigator>
					)}
				</NavigationContainer>
			</SafeAreaProvider>
		)
	}
}

export default withFirebaseHOC(AppContainer)

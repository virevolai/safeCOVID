import React, { Component, useState } from 'react'
import { Text, View, Switch, TextInput, KeyboardAvoidingView } from 'react-native'
import Btn from '../global/Btn'
import { componentStyle, textStyle } from '../global/styles'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import YouTube from 'react-native-youtube'
import { YOUTUBE_ANDROID_API_KEY } from 'react-native-dotenv'
import { withFirebaseHOC } from '../global/Firebase'

function Sick({ route, navigation }) {

	const [isEnabled, setIsEnabled] = useState(false)
	const [value, onChangeText] = useState('')
	const toggleSwitch = () => setIsEnabled(previousState => !previousState)

	console.log('Sick: got ', route)

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={componentStyle.container}
		>
			<YouTube
				apiKey={YOUTUBE_ANDROID_API_KEY}
				videoId={route.params.video}
				play // control playback of video with true/false
				// fullscreen // control whether the video should play in fullscreen or inline
				// loop // control whether the video should loop when ended
				// onReady={e => this.setState({ isReady: true })}
				// onChangeState={e => this.setState({ status: e.state })}
				// onChangeQuality={e => this.setState({ quality: e.quality })}
				onError={e => console.log('Sick::render:: ', e)}
				style={{ alignSelf: 'stretch', height: 300 }}
			/>

			<View style={{ marginTop: 20, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyItems: 'center' }}>
					<Text> 🧪 </Text>
					<Switch
						onValueChange={toggleSwitch}
						value={isEnabled}
					/>
					<Text> 💊 </Text>
				</View>
				<Text style={textStyle.normal}> { !isEnabled ? 'Waiting for test' : 'Confirmed test' } </Text>
				<Text style={textStyle.bold}> Ask for help (optional) </Text>
				<View style={{ borderRadius: 4, borderBottomColor: '#000000', borderBottomWidth: 1, }}>
					<TextInput
						multiline={true}
						style={[
							textStyle.normal, 
							{ height: 40, paddingLeft: 6, width: 300 } 
						]}
						onChangeText={text => onChangeText(text)}
						value={value}
					/>
				</View>
				<Btn
					title='🆘 Notify'
					onPress={() => {
						route.params.onNotify({ testConfirmed: isEnabled, optionalText: value })
						navigation.goBack()
					}}
				/>
			</View>

			<View style={componentStyle.footer}>
				<Btn
					title='🔙 Go Back'
					onPress={() => navigation.goBack()}
				/>
			</View>

		</KeyboardAvoidingView>
	)
}


export default withFirebaseHOC(Sick)

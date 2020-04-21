import React, { Component } from 'react'
import { Text, View, } from 'react-native'
import Btn from '../global/Btn'
import { componentStyle } from '../global/styles'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import YouTube from 'react-native-youtube'
import { YOUTUBE_ANDROID_API_KEY } from 'react-native-dotenv'
import { withFirebaseHOC } from '../global/Firebase'

function Tutorial({ route, navigation }) {

		console.log('Tutorial: got ', route)

		return (
			<View style={componentStyle.container}>
				<YouTube
					apiKey={YOUTUBE_ANDROID_API_KEY}
					videoId={route.params.video}
					play // control playback of video with true/false
					// fullscreen // control whether the video should play in fullscreen or inline
					// loop // control whether the video should loop when ended
					// onReady={e => this.setState({ isReady: true })}
					// onChangeState={e => this.setState({ status: e.state })}
					// onChangeQuality={e => this.setState({ quality: e.quality })}
					onError={e => console.log('Tutorial::render:: ', e)}
					style={{ alignSelf: 'stretch', height: 300 }}
				/>
				<View style={componentStyle.footer}>
					<Btn
						title='🔙 Go Back'
						onPress={() => navigation.goBack()}
					/>
				</View>
			</View>
		)
}


export default withFirebaseHOC(Tutorial)

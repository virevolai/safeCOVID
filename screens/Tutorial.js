import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Colors, textStyle } from '../global/styles/'
import YouTube from 'react-native-youtube'
import { YOUTUBE_ANDROID_API_KEY } from 'react-native-dotenv'
import { withFirebaseHOC } from '../global/Firebase'

function Tutorial({ route, navigation }) {

		console.log('Tutorial: got ', route)

		return (
			<View style={styles.container}>
				<YouTube
					apiKey={YOUTUBE_ANDROID_API_KEY}
					videoId={route.params.video}
					play // control playback of video with true/false
					// fullscreen // control whether the video should play in fullscreen or inline
					// loop // control whether the video should loop when ended
					// onReady={e => this.setState({ isReady: true })}
					// onChangeState={e => this.setState({ status: e.state })}
					// onChangeQuality={e => this.setState({ quality: e.quality })}
					onError={e => console.log('Tutorial::render:: ', error )}
					style={{ alignSelf: 'stretch', height: 300 }}
				/>
				<View style={{paddingTop: 100 }}>
					<Button
						title='Go Back'
						onPress={() => navigation.goBack()}
					/>
				</View>
			</View>
		)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.Pbackground,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default withFirebaseHOC(Tutorial)

import React, { Component } from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import BleCheck from '../global/BleCheck'
import Location from '../global/Location'
import Movement from '../global/Movement'
import Score from '../global/Score'
import { Colors } from '../global/styles/'
import { withFirebaseHOC } from '../global/Firebase'

function Vote(props) {
	console.log('Vote::render: Init')
	return (
		<View style={styles.container}>
			<Score />
			<Location />
			<BleCheck />
			<Movement />
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

export default withFirebaseHOC(Vote)

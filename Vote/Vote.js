import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import BleCheck from '../global/BleCheck'
import Location from '../global/Location'
import Movement from '../global/Movement'
import { withFirebaseHOC } from '../global/Firebase'

function Vote() {
	console.log('Vote::render: Init')
	return (
		<View style={styles.container}>
			<Text>safeCOVID</Text>
			<Location />
			<BleCheck />
			<Movement />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default withFirebaseHOC(Vote)

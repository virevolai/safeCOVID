import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import BleCheck from './BleCheck';
import Location from './Location';

export default function App() {
	return (
		<View style={styles.container}>
			<Text>safeCOVID bluetooth!</Text>
			<Location />
			<BleCheck />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

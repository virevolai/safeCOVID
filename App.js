import React, { Component } from 'react';
import Firebase, { FirebaseProvider } from './global/Firebase';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import BleCheck from './BleCheck';
import Location from './Location';
import Movement from './Movement';
import Login from './Login';

export default function App() {
	return (
		<FirebaseProvider value={Firebase}>
			<View style={styles.container}>
				<Text>safeCOVID</Text>
				<Login />
				<Location />
				<BleCheck />
				<Movement />
			</View>
		</FirebaseProvider>
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

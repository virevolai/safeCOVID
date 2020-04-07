import React, { Component } from 'react';
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, CURRENT_SCHEMA_VERSION } from 'react-native-dotenv'
import { Platform, StyleSheet, Text, View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import BleCheck from './BleCheck';
import Location from './Location';
import Movement from './Movement';

export default function App() {
	return (
		<View style={styles.container}>
			<Text>safeCOVID</Text>
			<Location />
			<BleCheck />
			<Movement />
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

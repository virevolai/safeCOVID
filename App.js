import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';


class BleCheck extends Component {

	constructor() {
		super();
		this.manager = new BleManager();
		this.state = {info: "", values: {}, isScanning: false,  devices: new Set()}
	}

	componentDidMount() {
		if (Platform.OS === 'ios') {
			this.manager.onStateChange((state) => {
				if (state === 'PoweredOn') {
					this.stopDeviceScanTimeout()
					this.scanAndConnect()
				}
			})
		} else {
			this.stopDeviceScanTimeout()
			this.scanAndConnect()
		}
	}

	info(message) {
		this.setState({info: message})
	}

	error(message) {
		this.setState({info: "ERROR: " + message})
	}

	updateValue(key, value) {
		this.setState({values: {...this.state.values, [key]: value}})
	}

	stopDeviceScanTimeout = () =>
		this.state.isScanning && 
			setTimeout(this.manager.stopDeviceScan(), 5000)

	scanAndConnect = () => {
		this.manager.startDeviceScan(
			null,
			null, 
			(error, device) => {
				this.info("Scanning...")
				this.setState({ isScanning: true })
				console.log(device)
				device && device.name && 
					this.setState({ devices: this.state.devices.add(device.name) })

				if (error) {
					this.error(error.message)
					this.setState({ isScanning: false })
					return
				}
			}
		)
	}

	render() {
		return (
			<View style={{backgroundColor: 'yellow'}}>
				<Text>{this.state.info}</Text>
				<Text>{this.state.devices}</Text>
			</View>
		)
	}
 
}

export default function App() {
	return (
		<View style={styles.container}>
			<Text>safeCOVID bluetooth!</Text>
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

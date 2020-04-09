import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { SCAN_TIMEOUT } from 'react-native-dotenv'
import { withFirebaseHOC } from '../global/Firebase'


class BleCheck extends Component {

	constructor() {
		super();
		this.manager = new BleManager();
		this.state = {info: "", values: {}, isScanning: false,  devices: new Set(), prevDevices: new Set()}
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

		const { devices } = this.state
		if (devices.size > 0 && devices !== prevDevices) {
			console.log('BleCheck::scanAndConnect: Saving devices')
			this.props.firebase.shared.createBluetoothEntry({ scans: Array.from(devices).join(',') })
				.then(() =>
					this.setState({ prevDevices: devices })
				)
		}
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

export default withFirebaseHOC(BleCheck)

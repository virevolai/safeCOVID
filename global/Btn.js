import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Colors, componentStyle, textStyle } from './styles'

export default function Btn(props) {
	return (
		<TouchableOpacity
			style={[ componentStyle.button, { backgroundColor: props.disabled ? 'grey' : Colors.Primary3 } ]}
			{...props}
		>
			<Text style={ props.disabled ? textStyle.buttonEnabled : textStyle.buttonDisabled }>
				{props.title} 
			</Text>
		</TouchableOpacity>
	)
	
}

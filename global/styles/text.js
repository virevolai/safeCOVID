import { StyleSheet } from 'react-native';
import Colors from './colors';

const common = {
	fontFamily: Colors.textFontFamily,
	fontSize: 16,
}

const textStyle = StyleSheet.create({
	normal: {
		...common,
		color: Colors.textP,
	},
	bold: {
		...common,
		color: Colors.textP,
		fontWeight: 'bold', 
	},
	score: {
		...common,
		color: Colors.textP,
		fontWeight: 'bold',
		fontSize: 92
	},
	light: {
		...common,
		color: Colors.textP,
		'fontSize': 15,
		margin: 10,
	},
})

export default textStyle;

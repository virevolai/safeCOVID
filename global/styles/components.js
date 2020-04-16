import { StyleSheet } from 'react-native';
import Colors from './colors';

const componentStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.Pbackground,
		alignItems: 'center',
		justifyContent: 'center',
	},
	footer: {
		position: 'absolute',
		bottom: 50,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 200,
	},
	button: {
		color: Colors.Primary2,
	}
})


export default componentStyle

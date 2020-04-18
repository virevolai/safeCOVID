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
		borderRadius: 12,
		backgroundColor: Colors.Primary,
		height: 52,
		width: 100,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
	}
})


export default componentStyle

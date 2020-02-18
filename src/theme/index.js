import { withTheme } from '../react-native-ui';

export default withTheme({
	palette: {
		tertiary: '#EFE8DA',
	},
	header: {
		height: 60,
		backgroundColor: {
			transparent: ['black', 'rgba(0,0,0,0)'],
			solid: '#EFE8DA'
		}
	},
	margin: {
		top: 15,
		left: 35,
		right: 35,
		bottom: 15
	},
	TextField: {
		style: {
			root: {
				backgroundColor: '#ffffff',
			}
		}
	}
})
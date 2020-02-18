import { withTheme } from '../react-native-ui';

export default withTheme({
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
	Paper: {
		style: {
			default: {
				margin: 0,
				marginVertical: 8,
			}
		}
	}
})
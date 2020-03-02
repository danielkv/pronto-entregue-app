import { withTheme } from '../react-native-ui';

export default withTheme({
	header: {
		height: 80,
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
	},
	Typography: {
		style: {
			title: {
				fontSize: 22,
			},
			subtitle: {
				fontSize: 16,
				color: '#999'
			},
			h4: {
				fontSize: 18,
			},
			h5: {
				fontSize: 16
			}
		}
	},
	Icon: {
		type: 'feather',
	}
})
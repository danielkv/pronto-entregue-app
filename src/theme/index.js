import { withTheme } from '../react-native-ui';

export default withTheme({
	header: {
		height: 80
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
			text: {
				fontSize: 14,
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
	Chip: {
		style: {
			default: {
				root: {
					height: 30,
					paddingHorizontal: 13
				}
			}
		}
	},
	TextField: {
		text: {
			backgroundColor: '#333'
		}
	},
	Icon: {
		type: 'feather',
	}
})
export default {
	header: {
		height: 60,
		background: ['black', 'rgba(0,0,0,0)'],
	},
	colors: {
		primary: '#FF7C03',
		divider: '#B95A02',
		error: '#C80707',
	},
	Text: {
		/* color: '#ffffff', */
		style: {
			color: '#ffffff',
		},
		h1Style: {
			color: '#ffffff',
			fontSize: 20,
		},
		h2Style: {
			color: '#ffffff',
			fontSize: 18,
		},
		h3Style: {
			color: '#ffffff',
			fontSize: 14,
			fontWeight: 'normal'
		},
		h4Style: {
			color: '#ffffff',
			fontSize: 12,
			fontWeight: 'normal'
		},
	},
	Input: {
		placeholderTextColor: '#B95A02',
		containerStyle: {
			marginRight: 0,
			marginLeft: 0,
			marginVertical: 5,
		},
		inputStyle: {
			paddingHorizontal: 8,
		},
		disabledInputStyle: {
			backgroundColor: '#B95A02',
			color: '#543315',
		},
		inputContainerStyle: {
			borderBottomColor: '#000',
		}
	},
	Button: {
		loadingProps: {
			color: '#FF7C03',
		},
		disabledTitleStyle: {
			color: '#543315',
		},
		containerStyle: {
			margin: 5,
		},
		buttonStyle: {
			backgroundColor: '#fff',
		},
		titleStyle: {
			color: '#FF7C03',
		},
	},
	Divider: {
		style: {
			height: 2,
			marginVertical: 10,
		}
	}
}
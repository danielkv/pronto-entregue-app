import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default {
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
	colors: {
		primary: '#F11761',
		secondary: '#A4D82B',
		background: '#EFE8DA',
		backgroundLowContrast: '#D1C6B1',
		divider: '#D1C6B1',
		gray: {
			dark: '#333333',
			light: '#999999',
			lighter: '#cccccc'
		},
		text: {
			light: '#ffffff',
			dark: '#333333'
		},
		error: '#C80707'
	},
	Text: {
		/* color: '#ffffff', */
		style: {
			/* color: '#ffffff', */
		},
		h1Style: {
			/* color: '#ffffff', */
			fontSize: 20,
		},
		h2Style: {
			/* color: '#ffffff', */
			fontSize: 18,
		},
		h3Style: {
			/* color: '#ffffff', */
			fontSize: 14,
			fontWeight: 'normal'
		},
		h4Style: {
			/* color: '#ffffff', */
			fontSize: 12,
			fontWeight: 'normal'
		},
	},
	Input: {
		placeholderTextColor: '#cccccc',
		containerStyle: {
			marginRight: 0,
			marginLeft: 0,
			marginHorizontal: 0,
			marginVertical: 5,
			paddingHorizontal: 0
		},
		inputStyle: {
			marginHorizontal: 0,
			paddingHorizontal: 25,
			fontSize: 16,
			lineHeight: 50,
			height: 50
		},
		disabledInputStyle: {
			backgroundColor: '#B95A02',
			color: '#543315'
		},
		inputContainerStyle: {
			borderBottomColor: 'transparent',
			backgroundColor: '#fff',
			borderRadius: 25,
			marginHorizontal: 0
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
			marginHorizontal: 0,
			marginVertical: 5,
			borderRadius: 25,
		},
		buttonStyle: {
			borderRadius: 25,
			height: 50,
			// backgroundColor: '#F11761',
			/* borderWidth: 1,
			borderColor: '#655A51',
			backgroundColor: 'none', */
			
		},
		titleStyle: {
			fontSize: 16,
			
		},
	},
	Divider: {
		style: {
			height: 2,
			marginVertical: 10,
		}
	},
	ListItem: {
		containerStyle: {
			backgroundColor: 'transparent',
		},
		titleStyle: {
			color: '#fff',
			fontWeight: 'bold',
		},
		subtitleStyle: {
			color: '#fff'
		},
	}
}
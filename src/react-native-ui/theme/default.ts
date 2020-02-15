import { Theme } from './types';

export default<Theme> {
	colors: {
		primary: '#F11761',
		secondary: '#A4D82B',
		background: '#EFE8DA',
		divider: '#D1C6B1',
		gray: '#333333',
		text: '#333333',
		error: '#C80707'
	},
	TextField: {
		color: "primary",
		variant: 'standard',
		style: {
			root: {
				backgroundColor: '#ffffff',
				borderRadius: 25,
				height: 50,
				border: 0,
				paddingHorizontal: 20,
				paddingVertical: 10
			},
			text: {
				fontSize: 16,
				color: "#333333"
			}
		},
	}
}
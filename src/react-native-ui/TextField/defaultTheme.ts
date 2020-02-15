import { TextFieldType } from "./types";

export default<TextFieldType> {
	color: "primary",
	variant: 'standard',
	style: {
		standard: {
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
		outlined: {
			root: {
				
			},
			text: {
				
			}
		},
		filled: {
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
		}
	},
}
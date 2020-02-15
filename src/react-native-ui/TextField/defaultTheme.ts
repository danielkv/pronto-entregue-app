import { TextFieldType } from "./types";

export default<TextFieldType> {
	variant: 'standard',
	style: {
		standard: {
			root: {
				marginVertical: 5,
			},
			inputContainer: {
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
			inputContainer: {
				
			},
			text: {
				
			}
		},
		filled: {
			inputContainer: {
				
			},
			text: {
				
			}
		}
	},
}
import { TextFieldType } from "./types";

export default<TextFieldType> {
	variant: 'default',
	style: {
		default: {
			root: {
				marginVertical: 5,
			},
			label: {
				marginTop: 4,
				fontSize: 13,
				color: '#aaa'
			},
			inputContainer: {
				backgroundColor: '#ffffff',
				borderRadius: 15,
				height: 70,
				border: 0,
				paddingHorizontal: 20,
				paddingVertical: 10,
				flexDirection: 'column',
				alignItems: 'stretch',
				justifyContent: 'space-between'
			},
			text: {
				flex: 1,
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
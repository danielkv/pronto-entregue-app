import { TextFieldType } from "./types";

export default<TextFieldType> {
	variant: 'default',
	style: {
		default: {
			root: {
				marginVertical: 5,
			},
			inputContainer: {
				backgroundColor: '#ffffff',
				borderRadius: 25,
				height: 50,
				border: 0,
				paddingHorizontal: 20,
				paddingVertical: 10,
				flexDirection: 'row',
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
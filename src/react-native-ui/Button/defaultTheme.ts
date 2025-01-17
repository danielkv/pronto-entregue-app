import { ButtonType } from "./types";

export default<ButtonType> {
	color: "default",
	variant: 'default',
	fullWidth: true,
	style: {
		disabled: {
			button: {
				backgroundColor: '#ccc',
			},
			text: {
				color: '#999'
			}
		},
		default: {
			root: {
				marginVertical: 5,
			},
			button: {
				borderRadius: 25,
				height: 50,
				border: 0,
				paddingHorizontal: 20,
				backgroundColor: 'transparent',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'row'
			}
		},
		outlined: {
			button: {
				borderWidth: 1,
				backgroundColor: 'transparent'
			},
			text: {
				
			}
		},
		filled: {
			button: {
				
			},
			text: {
				
			}
		}
	},
}
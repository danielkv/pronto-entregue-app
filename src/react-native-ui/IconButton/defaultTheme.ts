import { IconButtonType } from "./types";

export default<IconButtonType> {
	color: "default",
	variant: 'default',
	style: {
		default: {
			root: {
				
			},
			button: {
				borderRadius: 50,
				width: 50,
				height: 50,
				border: 0,
				backgroundColor: 'transparent',
				alignItems: 'center',
				justifyContent: 'center',
			}
		},
		outlined: {
			button: {
				borderWidth: 1,
				backgroundColor: 'transparent'
			},
			root: {
				
			}
		},
		filled: {
			button: {
				
			},
			root: {
				
			}
		}
	},
}
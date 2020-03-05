import { AvatarType } from "./types";

export default<AvatarType> {
	variant: 'circle',
	size: 50,
	style: {
		circle: {
			root: {
				borderRadius: 50,
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'hidden'
			},
			text: {
				textAlign: 'center',
				fontSize: 16,
				fontWeight: 'bold'
			},
			image: {
				resizeMode: 'cover'
			}
		},
		rounded: {
			root: {
				borderRadius: 15,
			},
			text: {},
			image: {}
		},
		square: {
			root: {
				borderRadius: 0,
				backgroundColor: '#fff',
				alignItems: 'center'
			},
			text: {},
			image: {}
		}
	},
}
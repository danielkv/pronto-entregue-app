import { AvatarType } from "./types";

export default<AvatarType> {
	variant: 'circle',
	style: {
		circle: {
			root: {
				borderRadius: 50,
				width: 50,
				height: 50,
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
				width: 50,
				height: 50,
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
				width: 24,
				height: 24,
				alignItems: 'center'
			},
			text: {},
			image: {}
		}
	},
}
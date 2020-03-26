import { BadgeType } from "./types";

export default<BadgeType> {
	color: "default",
	showZero: false,
	anchorOrigin: {
		vertical: 'top',
		horizontal: 'right'
	},
	style: {
		root: {
			position: 'relative',
		},
		badge: {
			paddingHorizontal: 8,
			borderRadius: 13,
			height: 23,
			alignSelf: 'flex-start',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'absolute'
		},
		text: {
			fontSize: 13,
		}
		
	},
}
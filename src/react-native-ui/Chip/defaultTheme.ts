import { ChipType } from "./types";

export default<ChipType> {
	color: "default",
	variant: 'default',
	style: {
		default: {
			root: {
				paddingHorizontal: 16,
				borderRadius: 20,
				height: 40,
				alignSelf: 'flex-start',
				alignItems: 'center',
				justifyContent: 'center'
			},
			text: {
				fontSize: 16,
			}
		},
		outlined: {
			root: {
				borderWidth: 1,
				paddingHorizontal: 12,
				paddingVertical: 8,
				borderRadius: 30
			},
			text: {
			}
		},
	},
}
import { ChipType } from "./types";

export default<ChipType> {
	color: "default",
	variant: 'default',
	style: {
		default: {
			root: {
				paddingHorizontal: 16,
				paddingVertical: 10,
				borderRadius: 20,
				alignSelf: 'flex-start'
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
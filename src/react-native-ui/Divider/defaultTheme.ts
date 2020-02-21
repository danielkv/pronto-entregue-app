import { DividerType } from "./types";

export default<DividerType> {
	variant: 'default',
	style: {
		default: {
			marginVertical: 20,
			borderTopWidth: 1,
			// borderTopColor => theme
		},
		middle: {
			marginHorizontal: 35
		}
	},
}
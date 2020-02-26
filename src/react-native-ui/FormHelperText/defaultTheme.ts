import { FormHelperTextType } from "./types";

export default<FormHelperTextType> {
	color: "secondary",
	variant: 'default',
	style: {
		default: {
			root: {
				marginTop: 4,
				marginLeft: 5,
			},
			text: {
				fontSize: 12,
				
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
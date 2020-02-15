import { FormHelperTextType } from "./types";

export default<FormHelperTextType> {
	color: "primary",
	variant: 'standard',
	style: {
		standard: {
			root: {
				marginTop: 4,
				marginLeft: 5,
			},
			text: {
				fontSize: 12,
				color: "#999"
			}
		},
		outlined: {
			root: {
				borderWidth: 1,
				borderColor: "#999",
				paddingHorizontal: 12,
				paddingVertical: 8,
				borderRadius: 30
			},
			text: {
				color: "#999"
			}
		},
	},
}
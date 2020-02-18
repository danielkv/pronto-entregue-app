import { PaperType } from "./types";

export default<PaperType> {
	variant: 'default',
	style: {
		default: {
			paddingHorizontal: 35,
			paddingVertical: 35,
			borderRadius: 30,
			backgroundColor: '#fff',
			width: '100%'
		},
		outlined: {
			backgroundColor: 'transparent',
			borderWidth: 1,
			borderColor: '#fff'
		},
	},
}
import { TypographyType } from "./types";

export default<TypographyType> {
	variant: 'text',
	style: {
		text: {
			fontSize: 16,
			fontWeight: "normal",
		},
		title: {
			fontWeight: "bold",
			fontSize: 20
		},
		subtitle: {
			fontWeight: "bold",
			fontSize: 18
		},
		error: {
			fontSize: 14,
			fontWeight: 'normal',
			color: '#f44336',
		},
		button: {
			fontSize: 16,
			textTransform: 'uppercase',
			textAlign: "center",
			fontWeight: 'normal'
		},
		h1: {
			fontWeight: "bold",
			fontSize: 24
		},
		h2: {
			fontWeight: "bold",
			fontSize: 22
		},
		h3: {
			fontWeight: "normal",
			fontSize: 20
		},
		h4: {
			fontWeight: "normal",
			fontSize: 18
		},
		h5: {
			fontWeight: "normal",
			fontSize: 16
		},
	},
}
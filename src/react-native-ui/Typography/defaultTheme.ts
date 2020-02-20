import { TypographyType } from "./types";

export default<TypographyType> {
	variant: 'text',
	style: {
		text: {
			fontSize: 16,
			fontWeight: "normal",
			fontFamily: 'Roboto'
		},
		title: {
			fontWeight: "bold",
			fontSize: 20
		},
		subtitle: {
			fontWeight: "normal",
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
			fontSize: 37
		},
		h2: {
			fontWeight: "bold",
			fontSize: 32
		},
		h3: {
			fontWeight: "normal",
			fontSize: 24
		},
		h4: {
			fontWeight: "normal",
			fontSize: 20
		},
		h5: {
			fontWeight: "normal",
			fontSize: 16
		},
	},
}
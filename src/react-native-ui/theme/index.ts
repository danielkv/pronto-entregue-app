import FormHelperTextDefaultTheme from '../FormHelperText/defaultTheme';
import TextFieldDefaultTheme from '../TextField/defaultTheme';
import { Theme } from './types';

export default<Theme> {
	colors: {
		primary: '#F11761',
		secondary: '#A4D82B',
		background: '#EFE8DA',
		divider: '#D1C6B1',
		gray: '#333333',
		text: '#333333',
		error: {
			light: "#e57373",
			main: "#f44336",
			dark: "#d32f2f",
			contrastText: "#fff"
		}
	},
	TextField: TextFieldDefaultTheme,
	FormHelperText: FormHelperTextDefaultTheme,
}
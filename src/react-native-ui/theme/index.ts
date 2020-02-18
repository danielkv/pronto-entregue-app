import ButtonDefaultTheme from '../Button/defaultTheme';
import ChipDefaultTheme from '../Chip/defaultTheme';
import FormHelperTextDefaultTheme from '../FormHelperText/defaultTheme';
import IconDefaultTheme from '../Icon/defaultTheme';
import TextFieldDefaultTheme from '../TextField/defaultTheme';
import TypographyDefaultTheme from '../Typography/defaultTheme';
import { Theme } from './types';

export default<Theme> {
	palette: {
		primary: {
			light: "#F3548A",
			main: "#F11761",
			dark: "#AC1347",
			contrastText: "#ffffff"
		},
		secondary: {
			light: "#C4EE64",
			main: "#A4D82B",
			dark: "#82AA26",
			contrastText: "#333333"
		},
		default: {
			light: "#999999",
			main: "#333333",
			dark: "#111111",
			contrastText: "#ffffff"
		},
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
	Button: ButtonDefaultTheme,
	Icon: IconDefaultTheme,
	Typography: TypographyDefaultTheme,
	Chip: ChipDefaultTheme,
}
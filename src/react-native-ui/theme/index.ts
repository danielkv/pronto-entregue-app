import AvatarDefaultTheme from '../Avatar/defaultTheme';
import ButtonDefaultTheme from '../Button/defaultTheme';
import ChipDefaultTheme from '../Chip/defaultTheme';
import FormHelperTextDefaultTheme from '../FormHelperText/defaultTheme';
import IconDefaultTheme from '../Icon/defaultTheme';
import IconButtonDefaultTheme from '../IconButton/defaultTheme';
import PaperDefaultTheme from '../Paper/defaultTheme';
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
		background: {
			light: "#fff",
			main: "#EFE8DA",
			dark: "#655A51",
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
		divider: '#D1C6B1',
		gray: '#333333',
		text: {
			default: '#F11761',
			button: '#ffffff',
			title: '#333333',
			subtitle: '#333333',
			h1: '#F11761',
			h2: '#333333',
			h3: '#333333',
			h4: '#333333',
			h5: '#333333'
		},
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
	IconButton: IconButtonDefaultTheme,
	Icon: IconDefaultTheme,
	Typography: TypographyDefaultTheme,
	Chip: ChipDefaultTheme,
	Paper: PaperDefaultTheme,
	Avatar: AvatarDefaultTheme,
}
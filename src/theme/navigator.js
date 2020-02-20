import { DefaultTheme } from '@react-navigation/native';

import theme from '.';
  
export default {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: theme.palette.background.main,
	},
};
import React from 'react';
import theme from '../theme/default';
import { Theme } from '../theme/types';

export const ThemeContext = React.createContext(theme);

interface IProps {
	theme: Theme,
	children: React.ReactNode
}

export default function ThemeProvider(props: IProps) {
	return (
		<ThemeContext.Provider value={props.theme}>
		{props.children}
		</ThemeContext.Provider>
	);
}

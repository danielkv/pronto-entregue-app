import { useContext } from "react";

import { merge, cloneDeep } from 'lodash';

import DefaultTheme from '../theme';
import { ThemeContext } from "../ThemeContext";
import { ComponentTypes } from "./types";

export function mergeStyles(theme: ComponentTypes, variant: string, styles: Object = {}) {
	const componentStyle = cloneDeep(theme.style);
	const componentStandardStyle = componentStyle.standard;
	const componentVariantStyle = componentStyle[variant];

	const resultStyles = merge(componentStandardStyle, componentVariantStyle, styles);

	return resultStyles;
}

export function withTheme(theme: Object) {
	return merge(cloneDeep(DefaultTheme), theme);
}

export function useTheme() {
	const theme = useContext(ThemeContext);

	return theme;
}
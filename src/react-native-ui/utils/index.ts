import { useContext } from "react";

import { merge, cloneDeep } from 'lodash';

import DefaultTheme from '../theme';
import { ThemeContext } from "../ThemeContext";
import { ComponentStyles } from "./types";


export function mergeStyles(style: ComponentStyles, variant: string, styles: Object = {}) {
	const componentStyle = cloneDeep(style);
	const componentStandardStyle = componentStyle.default;
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


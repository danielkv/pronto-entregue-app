import { ComponentTypes } from "./types";
import { ThemeContext } from "../ThemeContext";
import { merge, cloneDeep } from 'lodash';
import DefaultTheme from '../theme/default';
import { useContext } from "react";

export function getStyle(component: ComponentTypes, variant: string, styles: Object = {}) {
	const theme = ThemeContext._currentValue;

	const componentStyle = theme[component].style;
	const componentVariantStyle = componentStyle[variant];

	console.log(component, componentStyle)

	const resultStyles = merge(componentStyle, componentVariantStyle, styles);

	return resultStyles;
}

export function withTheme(theme: Object) {
	return merge(cloneDeep(DefaultTheme), theme);
}

export function useTheme() {
	const theme = useContext(ThemeContext);

	return theme;
}
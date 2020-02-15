import React, { ReactNode } from 'react';
import { View, TextInput } from 'react-native';
import {TextFieldProps} from './types';
import { getStyle } from '../utils';

export default function TextField(props: TextFieldProps) {
	const style = getStyle("TextField", props.variant, props.style)
	return (
		<View style={style.root}>
			<TextInput placeholder={props.label} style={style.text} {...props} />
		</View>
	)
}
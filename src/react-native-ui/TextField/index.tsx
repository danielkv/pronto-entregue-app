import React from 'react';
import { View, TextInput } from 'react-native';

import FormHelperText from '../FormHelperText';
import IconButton from '../IconButton';
import { mergeStyles, useTheme } from '../utils';
import { TextFieldProps } from './types';

function TextField({ variant, style, inputRef, label, helperText, error, value, disabled=false, actionButton, actionButtonOnPress, ...restProps }: TextFieldProps) {
	const { TextField } = useTheme();
	const finalVariant = variant || TextField.variant;
	const styles = mergeStyles(TextField.style, finalVariant, style);

	return (
		<View style={styles.root}>
			<View style={styles.inputContainer}>
				<TextInput {...restProps} editable={!disabled} ref={inputRef} value={value} placeholder={label} style={styles.text} />
				{React.isValidElement(actionButton)
					&& (
						<IconButton onPress={()=>actionButtonOnPress(value)}>
							{actionButton}
						</IconButton>
					)}
			</View>
			{Boolean(helperText)&& <FormHelperText error={error}>{helperText}</FormHelperText>}
		</View>
	)
}

export default React.memo(TextField);
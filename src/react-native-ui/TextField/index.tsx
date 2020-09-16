import React from 'react';
import { View, TextInput } from 'react-native';

import FormHelperText from '../FormHelperText';
import IconButton from '../IconButton';
import Typography from '../Typography';
import { mergeStyles, useTheme } from '../utils';
import { TextFieldProps } from './types';

function TextField({ variant, style, inputRef, label, placeholder, helperText, error, value, disabled=false, actionButton, actionButtonOnPress, ...restProps }: TextFieldProps) {
	const { TextField } = useTheme();
	const finalVariant = variant || TextField.variant;
	const styles = mergeStyles(TextField.style, finalVariant, style);

	return (
		<View style={styles.root}>
			<View style={styles.inputContainer}>
				{Boolean(label) && <Typography style={styles.label}>{label}</Typography>}
				<View style={{ flex: 1 }}>
					<TextInput {...restProps} editable={!disabled} ref={inputRef} value={value} placeholder={placeholder} style={styles.text} />
					{React.isValidElement(actionButton)
					&& (
						<IconButton onPress={()=>actionButtonOnPress(value)}>
							{actionButton}
						</IconButton>
					)}
				</View>
			</View>
			{Boolean(helperText)&& <FormHelperText error={error}>{helperText}</FormHelperText>}
		</View>
	)
}

export default React.memo(TextField);
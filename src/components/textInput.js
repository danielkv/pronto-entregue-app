import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import sharedStyles, {styleSettings} from '../sharedStyles';

class customTextInput extends React.Component {

	constructor (props) {
		super(props);
		if (this.props.displayErrors === false)
			this.maxDisplayErrors = 0
		else
			this.maxDisplayErrors = this.props.displayErrors && Number.isInteger(this.props.displayErrors) ? this.props.displayErrors : 100;

		this.countErrors = 0;
	}

	renderErrors = ([key,value]) => {
		if (this.countErrors < this.maxDisplayErrors) {
			this.countErrors++;
			return (
				<View key={key} style={styles.errorView}>
					<Text style={styles.errorText}>{value.message}</Text>
				</View>
			)
		}
	}

	Errors = () => {
		this.countErrors = 0;
		return Object.entries(this.props.errors).map(this.renderErrors);
	}

	render () {
		let containerStyles = {...styles.container};
		let textInputStyles = {...styles.textInput};

		if (this.props.containerStyle) {
			Object.assign(containerStyles, this.props.containerStyle);
		}
		if (this.props.textInputStyle) {
			Object.assign(textInputStyles, this.props.textInputStyle);
		}
		
		return (
			<View style={containerStyles}>
				<View style={styles.inputContainer}>
					<TextInput
						style={textInputStyles}
						placeholderTextColor={styleSettings.placeholderTextColor}

						{...this.props}
					/>
					{!!(this.props.errors && Object.keys(this.props.errors).length) && <Icon name='alert-circle-outline' style={styles.errorTag} size={20} color={styleSettings.errorColor} />}
				</View>
				<View style={styles.errorsContainer}>
					{!!(this.props.errors && this.maxDisplayErrors) && <this.Errors />}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width : '100%',
	},
	inputContainer : {
		flexDirection:'row',
		alignItems:'center',
	},
	errorText : {
		color : styleSettings.errorColor,
		fontSize:11
	},
	textInput : {
		...sharedStyles.textInput
	},
	errorTag : {
		position:'absolute',
		right:10,
	}
});

export default customTextInput;
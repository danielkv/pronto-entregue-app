import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import sharedStyles from '../sharedStyles';

const Button = ({title, onPress, containerStyle, labelStyle, size}) => {
	let containerStyles = {...styles.container};
	let labelStyles = {...styles.labelStyle};

	if (size) {
		Object.assign(containerStyles, styles[size]);
		Object.assign(labelStyles, styles[`${size}Label`]);
	} else {
		Object.assign(containerStyles, styles.big);
		Object.assign(labelStyles, styles.bigLabel);
	} 

	if (containerStyle) {
		Object.assign(containerStyles, containerStyle);
	}
	if (labelStyles) {
		Object.assign(labelStyles, labelStyle);
	}

	return (
		<TouchableOpacity
			onPress={onPress}
			style={containerStyles}
		>
			<Text style={labelStyles}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical:10,
		backgroundColor:'#fff',
		fontFamily: 'Roboto',
		alignItems:'center',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,

		...sharedStyles.button
	},
	small : {
		paddingVertical : 10,
		paddingHorizontal : 14,
		borderRadius:5,
	},
	big : {
		paddingVertical : 15,
		paddingHorizontal : 20,
		borderRadius:6,
	},
	labelStyle : {
		color:'#FF9100',
		
	},
	smallLabel : {
		fontSize : 15,
		fontWeight: '100',
	},
	bigLabel : {
		fontSize : 17,
		fontWeight: 'bold',
	},
});

export default Button;

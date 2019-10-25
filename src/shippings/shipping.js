import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import sharedStyles from '../sharedStyles';

export default class Shipping {
	setTitle (title) {
		this.title = title;
	}

	setType (type) {
		this.type = type;
	}
	setPrice (price) {
		this.price = price;
	}

	renderOption () {
		return (
			<View style={styles.itemContainer}>
				<Text style={styles.itemTitle}>{this.title}</Text>
			</View>
		);
	}

	/*renderShippingInfo () {
	}*/
}

const styles = StyleSheet.create({
	itemContainer : {
		backgroundColor:'#fff',
		borderRadius:6,
		padding:20,
		marginBottom:13,
		marginHorizontal:10,
		
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,

		elevation: 4,
	},
	itemTitle : {
		...sharedStyles.font,
		fontSize:16,
		color:'#336535',
		fontWeight:'100',
	},
});
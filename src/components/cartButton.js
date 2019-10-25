import React from 'react';
import { View , Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

import sharedStyles from '../sharedStyles';

const CartButton = (props) => {
	let iconColor = props.iconColor || '#fff';
	
	let containerStyle = Object.assign({}, styles.container);
	if (props.containerStyle) Object.assign(containerStyle, props.containerStyle);
	
	let titleStyle = Object.assign({}, styles.textStyle);
	if (props.titleStyle) Object.assign(titleStyle, props.titleStyle);
	
	let containerPriceStyle = Object.assign({}, styles.priceContainer);
	if (props.containerPriceStyle) Object.assign(containerPriceStyle, props.containerPriceStyle);
	
	let textPriceStyle = Object.assign({}, styles.price);
	if (props.textPriceStyle) Object.assign(textPriceStyle, props.textPriceStyle);
	
	return (
		<TouchableOpacity style={containerStyle} onPress={props.onPress}>
			<View style={styles.textContainer}>
				<Icon style={styles.icon} type='material-community' name={props.icon} color={iconColor} size={24} />
				<Text style={titleStyle}>{props.title}</Text>
			</View>
			{!!(props.price || props.forceShowPrice) && <View style={containerPriceStyle}>
				<Text style={textPriceStyle}>{props.price}</Text>
			</View>}
		</TouchableOpacity>
	);
};

export default CartButton;

const styles = StyleSheet.create({
	container: {
		
		backgroundColor: '#FF9100',
		height:40,
		
		borderRadius:6,
		flexDirection:'row',
		overflow:'hidden',

		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,

		elevation: 4,
	},
	textContainer: {
		flexDirection:'row',
		alignItems:'center',
		flex:1,
		paddingVertical:10,
		paddingHorizontal:15,
	},
	icon: {
	},
	textStyle: {
		...sharedStyles.font,
		color:'#fff',
		fontSize:16,
		fontWeight:'bold',
		marginLeft:5,
		
	},
	priceContainer: {
		backgroundColor:'#fff',
		paddingVertical:6,
		paddingHorizontal:12,
		justifyContent:'center',
	},
	price: {
		...sharedStyles.font,
		color:'#336535',
		fontSize:14,
		fontWeight:'bold'
	},
});
import React from 'react';
import { View , Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

import sharedStyles from '../sharedStyles';


const ProductOption = (props) => {
	let iconColor = props.iconColor || '#fff';
	
	let containerStyle = Object.assign({}, styles.container);
	if (props.containerStyle) Object.assign(containerStyle, props.containerStyle);
	
	let titleStyle = Object.assign({}, styles.textStyle);
	if (props.titleStyle) Object.assign(titleStyle, props.titleStyle);
	
	let containerPriceStyle = Object.assign({}, styles.priceContainer);
	if (props.containerPriceStyle) Object.assign(containerPriceStyle, props.containerPriceStyle);
	
	let textPriceStyle = Object.assign({}, styles.price);
	if (props.textPriceStyle) Object.assign(textPriceStyle, props.textPriceStyle);

	let iconSize = props.iconSize || 24;
		
	return (
		<TouchableOpacity style={containerStyle} onPress={props.onPress}>
			<View style={styles.textContainer}>
				{!!props.icon && <Icon containerStyle={styles.icon} type='material-community' name={props.icon} color={iconColor} size={iconSize} />}
				<Text style={titleStyle}>{props.title}</Text>
			</View>
			{!!props.extraContent && 
				<View style={styles.extraContentContainer}>
					<props.extraContent />
				</View>}
			{!!props.price && <View style={containerPriceStyle}>
				<Text style={textPriceStyle}>{`R$ ${props.price.toFixed(2).replace('.', ',')}`}</Text>
			</View>}
		</TouchableOpacity>
	);
};

export default ProductOption;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		marginVertical:7,
		height: 40,

		borderRadius:4,
		flexDirection:'row',
		alignItems:'center',
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
		
		paddingHorizontal:10,
	},
	icon: {
		marginRight:10,
	},
	textStyle: {
		...sharedStyles.font,
		color:'#333',
		fontSize:14,
		fontWeight:'100',
	
	},
	extraContentContainer : { 
		flex:1,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'flex-end',
		marginRight:10,
	},
	priceContainer: {
		backgroundColor:'#FF9100',
		height:'100%',
		paddingVertical:6,
		paddingHorizontal:12,
		justifyContent:'center',
	},
	price: {
		...sharedStyles.font,
		color:'#fff',
		fontSize:12,
		fontWeight:'normal'
	},
});
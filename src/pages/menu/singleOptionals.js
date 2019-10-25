import React from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';

import ProductOption from '../../components/productOption';

import sharedStyles from '../../sharedStyles';

const SingleOptionals = (props) => {
	
	Optional = ([optionalKey, optional]) => {
		return (
			<View key={optionalKey} style={styles.optionalContainer}>
				
				<Text style={styles.optionalTitle}>{optional.title}</Text>
				<View style={styles.optionalOptionsContainer}>
					{Object.entries(optional.options).map( ([optionKey, option]) => {
						let icon;
						if (optional.selection_type == 'single') icon = option.selected ? 'radiobox-marked' : 'radiobox-blank';
						else icon = option.selected ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline';
						let iconColor = option.selected ? '#FF9100' : '#548156';
						let containerStyle = !option.selected ? {backgroundColor:'transparent', shadowOpacity:0, elevation:0} : {};
						let titleStyle = !option.selected ? {color:'#fff'} : {};
						let containerPriceStyle = !option.selected ? {backgroundColor:'transparent'} : {backgroundColor:'#336535'};
						
						return (<ProductOption 
									key={optionKey}
									title={option.name}
									price={option.price}
									icon={icon} 
									iconColor={iconColor} 
									containerStyle={containerStyle} 
									containerPriceStyle={containerPriceStyle}
									titleStyle={titleStyle}
									onPress={()=> {
										try {
											if (typeof props.onItemPress == 'function') props.onItemPress(optional, option);
										} catch (error) {
											ToastAndroid.show(error.message, ToastAndroid.SHORT);
										}
									}}
									/>)
					})}
				</View>
			</View>
		);
	}

	return (
		<View style={styles.optionalsContainer}>
			{Object.entries(props.optionals).map(this.Optional)}
		</View>
	);
};

const styles = StyleSheet.create({
	optionalsContainer: {
		
	},
	optionalContainer: {
		borderStyle:'dashed',
		borderTopWidth:2,
		borderTopColor: '#548156',
		paddingVertical:15,
		paddingHorizontal:30,
		marginTop:10,
		marginBottom:5,
	},
	optionalTitle : {
		...sharedStyles.font,
		fontSize:12,
		textAlign:'left',
		fontWeight:'100',
		color : '#fff',
		marginBottom:5,
	}
});

export default SingleOptionals;
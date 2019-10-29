import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProductOption from './productOption';

// import { Container } from './styles';

export default function CheckBox (props) {
	renderOption = (item) => {
		let icon = item.selected ? 'radiobox-marked' : 'radiobox-blank';
		let iconColor = item.selected ? '#FF9100' : '#fff';
		let containerStyle = !item.selected ? styles.option : styles.optionSelected;
		let titleStyle = !item.selected ? {color:'#fff'} : {};
		let containerPriceStyle = !item.selected ? {backgroundColor:'transparent'} : {backgroundColor:'#336535'};

		let title = (props.titleExtractor && typeof props.titleExtractor == 'function') ? props.titleExtractor(item) : item.title;
		let key = (props.keyExtractor && typeof props.keyExtractor == 'function') ? props.keyExtractor(item) : item.key;

		return (
			<ProductOption
				key={key}
				title={title}
				price={item.price}
				icon={icon} 
				iconColor={iconColor} 
				iconSize={20}
				containerStyle={containerStyle} 
				containerPriceStyle={containerPriceStyle}
				titleStyle={titleStyle}
				onPress={()=>{
					if (props.onSelectOption && typeof props.onSelectOption == 'function') props.onSelectOption(item);
				}}
				/>
		)
	}
	
	return (
		<View style={styles.container}>
			{props.data.map(renderOption)}
		</View>
	);
	
}

const styles = StyleSheet.create({
	container : {
	},
	option : {
		height:35,
		backgroundColor:'transparent',
		shadowOpacity:0,
		elevation:0
	},
	optionSelected : {
		height:35,
	},
});
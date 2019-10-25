import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

import ProductOption from '../../components/productOption';

import sharedStyles from '../../sharedStyles';

function VariableOptionals (props) {

	renderExtraContent = (selectedOptions) => {

		let optCount = Object.keys(selectedOptions).length;

		switch (optCount) {
			case 0 :
				return (
					<Icon type='material-community' name='chevron-right' size={24} color='#336535' />
				);
			case 1 :
				return (
					<Text style={styles.selectedText}>{selectedOptions[0].name}</Text>
				);
			default :
				return (
					<Text style={styles.selectedCount}>{optCount}</Text>
				);
		}
	}
	
	Optional = ([optionalKey, optional]) => {

		let selectedOptions = optional.getSelectedOptions();

		let priceTotal = optional.getTotalAmount();

		return (
			<View key={optionalKey} style={styles.optionalContainer}>
				

				<ProductOption 
					title={optional.title}
					price={priceTotal}
					titleStyle={{fontWeight:'bold'}}
					extraContent={()=>this.renderExtraContent(selectedOptions)}

					onPress={()=>props.onItemPress(optional)}
					/>
			</View>
		);
	}
	
	return (
		<View style={styles.optionalsContainer}>
			<Text style={styles.optionalTitle}>Selecione as opções abaixo</Text>
			{Object.entries(props.optionals).map(this.Optional)}
		</View>
	);
};

const styles = StyleSheet.create({
	optionalsContainer: {
		marginVertical : 20,
		marginHorizontal:30,
	},
	optionalContainer: {
		
		marginVertical:0,
	},
	optionalTitle : {
		...sharedStyles.font,
		fontSize:12,
		textAlign:'left',
		fontWeight:'100',
		color : '#fff',
		marginBottom:5,
	},
	selectedText : {
		...sharedStyles.font,
		fontSize:14,
		fontWeight:'100',
		color:'#aaa',
	},
	selectedCount : {
		backgroundColor: '#FF9100',
		paddingVertical:2,
		paddingHorizontal:8,
		borderRadius:20,
		...sharedStyles.font,
		fontSize:16,
		fontWeight:'bold',
		color:'#fff',
	},
});

export default VariableOptionals;
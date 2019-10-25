import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import sharedStyles from '../../sharedStyles';

import Delivery from '../../classes/Delivery';
import Addresses from '../../classes/Addresses';

//import Cart from '../../classes/Cart';

export default class DeliveryMethods extends Component {
	constructor (props) {
		super(props);
		
		this.state = {
			methods : Delivery.getMethods(Addresses.getAddresses())
		}
	}
	
	renderMethod = ({item}) => {
		return (
			<TouchableOpacity  onPress={() => {this.props.onSelectItem(item)}} >
				{item.renderOption()}
			</TouchableOpacity>
		);
	}

  	render() {
		
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.methods}
					renderItem={this.renderMethod}
					keyExtractor={(item)=>item.address? item.address.id.toString() : 'pickup'}
					style={styles.flatListStyle}
					/>
			</View>
		)
		
  	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection:'column',
	},
	flatListStyle : {
		flex: 1,		
		marginTop:15,
		
		paddingHorizontal:10,
	},
});

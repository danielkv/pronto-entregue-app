import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {NavigationEvents} from 'react-navigation';

import Header from '../../navigation/header';
import sharedStyles from '../../sharedStyles';
import { Icon } from 'react-native-elements';
import NavigationService from '../../NavigationService';
import User from '../../classes/User';
import Addresses from '../../classes/Addresses';


export default class AddressesComp extends Component {
	static navigationOptions = {
		header : null
	}

	constructor (props) {
		super(props);
		this.state = {
			data : Addresses.getAddresses(),
			loading : true
		}
	}

	loadAddresses = () => {
		this.setState({data:Addresses.getAddresses(), loading:false});
	}

	saveMainAddress = async (data) => {
		try {
			this.setState({ loading: true });
			await Addresses.update(data, User.getToken());
			ToastAndroid.show(`${data.title} definido como endereço principal`, ToastAndroid.SHORT);
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		} finally {
			this.setState({ loading: false });
		}
	}

	_onLongPress = (index) => {
		let {data} = this.state;
		if (!data[index].isMainAddress) {
			let newData = data.map((row)=>{
				row.isMainAddress=false;
				return row;
			});
			newData[index].isMainAddress=true;
			this.saveMainAddress(newData[index]);
			this.setState({data:newData});
		} else {
			ToastAndroid.show('Esse endereço já é o principal', ToastAndroid.SHORT);
		}
	}

	onPressDelete = (index) => {
		let {data} = this.state;
		
		Alert.alert(
			'Excluir endereço',
			`Tem certeza que deseja excluir ${data[index].title}`,
			[
				{
					text: 'Não',
					style: 'cancel',
				},
				{text: 'Sim', onPress: () => {this.deleteAddress(data[index]);}},
			],
			{cancelable: false},
		  );
		
	}
	
	deleteAddress = async (data) => {		
		try {
			this.setState({ loading: true });
			let response = await Addresses.delete(data, User.getToken());
			ToastAndroid.show(`${data.title} removido`, ToastAndroid.SHORT);

			this.setState({data:response});
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		} finally {
			this.setState({ loading: false });
		}
	}

	RenderAddress = ({item, index}) => {
		return (
			<TouchableOpacity style={styles.itemContainer} delayLongPress={1000} onLongPress={() => {this._onLongPress(index)}} >
				
				<View style={styles.buttonsContainer}>
					<TouchableOpacity onPress={() => {this.onPressDelete(index)}} >
						<Icon type='material-community' name='delete' size={20} color='#fff' />
					</TouchableOpacity>
				</View>
				{!!item.isMainAddress && <Icon containerStyle={styles.itemMainAddress} type='material-community' name='checkbox-marked-circle' size={20} color='#A2B8A3' />}
				<View>
					<Text style={styles.itemTitle}>{item.title}</Text>
					<Text style={styles.itemStreet}>{`${item.street}, ${item.number}`}</Text>
					<Text style={styles.itemDistrict}>{item.district}</Text>
					<Text style={styles.itemCity}>{`${item.city} - ${item.state}`}</Text>
					<Text style={styles.itemZipcode}>{item.zipcode}</Text>
				</View>
				
			</TouchableOpacity>
		)
	}

	headerRight = () => (
		this.state.loading ? <ActivityIndicator color='#fff' size='small' /> : 
		<TouchableOpacity onPress={() => {NavigationService.navigate('Add_Address')}} >
			<Icon type='material-community' name='plus' color='#fff' size={24} />
		</TouchableOpacity>
	)

	onRouteFocus = () => {
		this.loadAddresses();
	}

  	render() {
		return (
			<View style={styles.container}>
				<NavigationEvents
					onDidFocus={(payload) => this.onRouteFocus()}
					/>

				<Header title='Meus endereços' headerLeftAction='goBack' headerRight={() => (this.headerRight())} />

				{!!this.state.data && <FlatList
					style={styles.flatListStyle}
					data={this.state.data}
					renderItem={this.RenderAddress}
					keyExtractor={(item)=> item.id.toString()}
					/>}
			</View>
		)
		
  	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection:'column',
		justifyContent: 'flex-start',
		backgroundColor: '#336535',
		alignItems:'center',
	},
	loadingIcon : {
		marginTop:50,
	},
	itemMainAddress : {
		position:'absolute',
		right:10,
		bottom: 10,
	},
	buttonsContainer : {
		flexDirection:'row',
		position:'absolute',
		right:10,
		top: 10
	},
	flatListStyle : {
		flex: 1,
		width:'100%',
		marginTop:80,
		
		overflow: 'visible',
		paddingHorizontal:30,
		/*alignItems:'stretch'*/
	},
	itemContainer : {
		backgroundColor:'#5B815C',
		borderRadius:6,
		padding:20,
		marginBottom:30,
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
		color:'#fff',
		fontWeight:'bold',
		fontSize:18,
	},
	itemStreet : {
		...sharedStyles.font,
		fontWeight:'100',
		fontSize:16,
		color:'#fff',
	},
	itemDistrict : {
		...sharedStyles.font,
		fontWeight:'100',
		fontSize:16,
		color:'#fff',
	},
	itemCity : {
		...sharedStyles.font,
		fontWeight:'100',
		fontSize:16,
		color:'#fff',
	},
	itemZipcode : {
		...sharedStyles.font,
		fontWeight:'100',
		fontSize:16,
		color:'#fff',
	},
});

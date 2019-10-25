import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';

import Header from '../../navigation/header';
import Button from '../../components/button';
import User from '../../classes/User';
import sharedStyles from '../../sharedStyles';

import NavigationService from '../../NavigationService';

export default class Profile extends Component {
	static navigationOptions = {
		header : null
	}

	constructor (props) {
		super(props);
		this.state = {
			data : {
				firstname : '',
				lastname : '',
				phone : '',
				email : '',
			}
		}
	}

	loadUser() {
		if (User.isUserLoggedIn()) {
			this.setState({data:User.getUser()});
		} else {
			ToastAndroid.show(`Você não está logado`, ToastAndroid.SHORT);
			NavigationService.navigate('MenuRoutes');
		}
	}

	editUser = () => {
		NavigationService.navigate('Subscription', {			
			
			editUser : true,
			editData : this.state.data
			
		})
	}

	headerRight = () => (
		<TouchableOpacity onPress={() => {this.editUser()}} >
			<Icon type='material-community' name='pencil' color='#fff' size={24} />
		</TouchableOpacity>
	)

  	render() {
		let {data} = this.state;
		return (
			<View style={styles.container}>
				<NavigationEvents
					onWillFocus={(payload) => this.loadUser()}
					/>

				<Header title='Meus dados' headerRight={() => (this.headerRight())} />
				
				{!!this.state.data.firstname &&
				<View style={styles.userContainer}>
					<View style={styles.headerContainer}>
						<Icon type='material-community' name='account' color='#fff' size={100} />
						<Text style={styles.userName}>{`${data.firstname} ${data.lastname}`}</Text>
						<Text style={styles.userEmail}>{data.email}</Text>
						<View style={styles.listItem}>
							<Icon type='material-community' name='phone' color='#fff' size={20} />
							<Text style={styles.itemText}>{data.phone}</Text>
						</View>	
					</View>
					<View style={styles.infoContainer}>				
						<Button title='Meus endereços' labelStyle={{color:'#336535'}} onPress={()=>{NavigationService.navigate('Addresses')}} />
						<Button title='Meus pedidos' size='small' labelStyle={{color:'#336535'}} onPress={()=>{NavigationService.navigate('OrdersRoutes')}} />
					</View>
				</View>
				}
			</View>
		)
  	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection:'column',
		justifyContent: 'center',
		backgroundColor: '#336535',
		alignItems:'center',
	},
	userName : {
		...sharedStyles.font,
		fontSize:18,
		fontWeight:'bold',
		textAlign:'center',
		color:'#fff',
	},
	userEmail : {
		color:'#fff',
		textAlign:'center',
		...sharedStyles.font,
		fontSize:12,
		fontWeight:'100'
	},
	infoContainer : {
		padding:40,
	},
	userContainer : {
		width:'100%',
		marginTop:15,
	},
	headerContainer : {
		padding:40,
		borderBottomWidth:5,
		borderBottomColor:'#FF9100',
	},
	listItem : {
		flexDirection:'row',
		justifyContent:'center',
		marginTop:15,
	},
	itemText : {
		marginLeft:10,
		color:'#fff',
		fontSize : 16,
		fontWeight:'normal',
		...sharedStyles.font
	}
});
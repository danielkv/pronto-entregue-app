import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {Icon} from 'react-native-elements';

import Button from '../components/button';
import sharedStyles from '../sharedStyles';
import NavigationService from '../NavigationService';
import User from '../classes/User';


class DrawerMenu extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			isUserLoggedIn : User.isUserLoggedIn(),
			userData : User.getUser(),
		}

		NavigationService.setDrawerComponent(this);
	}

	reload = () => {
		let state = {
			isUserLoggedIn : User.isUserLoggedIn(),
			userData : User.getUser(),
		}
		this.setState(state);
	}

	renderMenuItem = ({route_key, init}) => {
		let active = this.props.activeItemKey == route_key ? true : false;
		let route = this.props.descriptors[route_key];
		let itemStyle = active ? {...styles.itemStyle, ...styles.activeItemStyle} : styles.itemStyle;
		let onPress = init ? ()=>NavigationService.resetTo(route_key, init) : ()=>NavigationService.navigate(route_key);

		return (
			<TouchableOpacity onPress={onPress}>
				<View style={itemStyle}>
					
					<View style={styles.iconContainerStyle}><route.options.drawerIcon /></View>
					<View style={styles.labelContainerStyle}>
						<Text style={styles.labelStyle}>{route.options.title ? route.options.title : route_key}</Text>
					</View>
					
				</View>
			</TouchableOpacity>
		)
	}

	logout = async () => {
		try {
			await User.logout();
			this.reload();
			NavigationService.navigate('Menu');
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		}
	}

	DrawerHeader = ()=> {
		if (this.state.isUserLoggedIn) {
			let userData = this.state.userData;
			return (<TouchableOpacity onPress={()=>{NavigationService.navigate('UserRoutes')}}>
				<View style={styles.userCardContainer}>
					<Icon type='material-community' name='account' size={69} color='#fff' />
					<View style={styles.userCardInfoContainer}>
						<Text style={styles.userCardName}>{`${userData.firstname} ${userData.lastname}`}</Text>
						<Text style={styles.userCardEmail}>{userData.email}</Text>
					</View>
				</View>
			</TouchableOpacity>)
		} else
			return (<View style={styles.userCardContainer}>
				<Icon type='material-community' name='account' size={69} color='#fff' />
				<View style={styles.userCardInfoContainer}>
					<Text style={{...sharedStyles.font, fontSize:12, color:'#fff'}}>Você não está logado</Text>
					<Button title='Login' size='small' containerStyle={{backgroundColor:'#fff'}} style={{color:'#FF9100'}} onPress={() => {NavigationService.navigate('Login')}} />
				</View>
			</View>)

	}
	
	render () {
		let {isUserLoggedIn} = this.state;
		return (
			<ScrollView>
				<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
					<this.DrawerHeader />
					<View style={styles.itemsContainerStyle}>
						<this.renderMenuItem route_key='MenuRoutes' init='Menu' />
						<this.renderMenuItem route_key='CartRoutes' init='Cart' />
						<View style={styles.separator} />

						{!!isUserLoggedIn && <this.renderMenuItem route_key='OrdersRoutes' init='Orders' />}

						<this.renderMenuItem route_key='About' />

						<View style={styles.separator} />
						{isUserLoggedIn ? 
							(<TouchableOpacity onPress={()=>{this.logout()}}>
								<View style={styles.itemStyle}>
									
									<View style={styles.iconContainerStyle}><Icon type='material-community' name='logout-variant' size={24} color='#fff' /></View>
									<View style={styles.labelContainerStyle}>
										<Text style={styles.labelStyle}>Logout</Text>
									</View>
										
								</View>
							</TouchableOpacity>)
						:
							(<View>
								<this.renderMenuItem route_key='Login' />
								<this.renderMenuItem route_key='Subscription' />
							</View>)
						}
					</View>
				</SafeAreaView>
			</ScrollView>
		)
	}
}

/*<DrawerItems {...props} />*/

const styles = StyleSheet.create({
	userCardContainer: {
		padding:20,
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#2E6131',
		borderBottomColor:'#205323',
		borderBottomWidth:2,
	},
	userCardInfoContainer: {
		marginLeft:10,
		flex:1,
		flexDirection:'column',
	},
	userCardName: {
		color:'#fff',
		...sharedStyles.font,
		fontSize:18,
		fontWeight:'bold'
	},
	userCardEmail: {
		color:'#fff',
		...sharedStyles.font,
		fontSize:12,
		fontWeight:'100',
	},
	/*userCardInfo: {
		color:'#fff',
		...sharedStyles.font,
		fontSize:12,
		fontWeight:'100',
	},*/

	//------------------------------

	container : {

	},
	itemsContainerStyle:{
		marginTop:10
	},
	separator : {
		borderStyle : 'dashed',
		borderTopWidth: 2,
		borderTopColor: '#649A66',
		marginVertical : 10
	},
	itemStyle : {
		height : 45,
		flexDirection : 'row',
		alignItems: 'center',
	},
	activeItemStyle : {
		backgroundColor: 'rgba(255,255,255,.2)'
	},
	labelStyle : {
		marginLeft:10,
		color : '#fff',
		...sharedStyles.font,
		fontSize:16
	},
	activeLabelStyle : {

	},
	iconContainerStyle : {
		marginRight:0,
		marginLeft:15,
		paddingRight:0
	},
});

const drawerOptions = {
	drawerBackgroundColor : '#4A844D',
	contentOptions : {
		activeTintColor :'#fff',
		activeBackgroundColor : 'rgba(255,255,255, .2)',
		itemsContainerStyle : styles.itemsContainerStyle,
		itemStyle : styles.itemStyle,
		labelStyle : styles.labelStyle,
		activeLabelStyle : styles.activeLabelStyle,
		iconContainerStyle : styles.iconContainerStyle
	}
}

export {
	DrawerMenu,
	drawerOptions
}
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';

import sharedStyles from '../sharedStyles';

import NavigationService from '../NavigationService';

class GradientHeader extends Component {

	constructor (props) {
		super(props);

		this.isNavigator = !!this.props.scene && !!this.props.scene.descriptor;

		if (this.isNavigator)
			this.headerLeftAction = this.props.scene.descriptor.options.headerLeftAction || null;
		else 
			this.headerLeftAction = this.props.headerLeftAction;

		if (this.isNavigator)
			this.HeaderRight = this.props.scene.descriptor.options.headerRight || null;
		else 
			this.HeaderRight = this.props.headerRight || null;

		if (this.isNavigator) {
			if (this.props.scene.descriptor.options.title)
				this.headerTitle = this.props.scene.descriptor.options.title;
			else
				this.headerTitle = this.props.defaultNavigationOptions.title || null;
		} else 
			this.headerTitle = this.props.title;

	}

	renderHeaderLeft = () => {
		
		if (this.isNavigator && this.props.scene.descriptor.options.headerLeft) return this.props.scene.descriptor.options.headerLeft;
		
		if (this.headerLeftAction == 'goBack') {
			return (<TouchableOpacity onPress={() => {NavigationService.goBack()}}>
        		<Icon name='arrow-back' size={24} color="#fff" />
			</TouchableOpacity>);
		} else {
			return (<TouchableOpacity onPress={() => {NavigationService.toggleDrawer()}}>
				<Icon name='menu' size={24} color="#fff" />
			</TouchableOpacity>);
		}
	}
	
	render () {
		return (
			<View style={styles.headerContainer}>

				<LinearGradient
					colors={['rgba(0,0,0,.9)', 'rgba(0,0,0,0)']}
					style={styles.linearGradient}
				/>

				<View style={styles.headerStyle}>
					<View style={styles.headerLeftContainerStyle}>
						<this.renderHeaderLeft />
					</View>
					{!!this.headerTitle &&
						<View style={styles.headerTitleContainerStyle}>
							<Text style={styles.headerTitleStyle}>{this.headerTitle}</Text>
						</View>}
					<View style={styles.headerRightContainerStyle}>
						{!!this.HeaderRight && <this.HeaderRight />}
					</View>
				</View>

			</View>
		);
	}
}

//<Header {...this.props} />

const styles = StyleSheet.create({
	headerContainer : {
		backgroundColor: 'transparent',
		height:50,
		position:'absolute',
		top:0,
		left:0,
		right:0,
		zIndex:9999
	},
	headerStyle : {
		flexDirection:'row',
		alignItems : 'center',
		...StyleSheet.absoluteFillObject
	},
	headerTitleStyle : {
		...sharedStyles.font,
		fontWeight: 'bold',

		fontSize:18,
		color:'#fff',
		marginLeft: 0,
	},
	headerTitleContainerStyle : {
		flex:1,
		marginLeft:10
	},
	headerLeftContainerStyle : {
		marginLeft:10
	},
	headerRightContainerStyle : {
		marginRight:10
	},
	linearGradient : {
		...StyleSheet.absoluteFillObject
	}
});

export default GradientHeader;

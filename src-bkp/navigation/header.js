import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
//import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';

import sharedStyles from '../sharedStyles';

import NavigationService from '../NavigationService';

const GradientHeader = (props) => {

	let isNavigator = !!props.scene && !!props.scene.descriptor;

	if (isNavigator)
		headerLeftAction = props.scene.descriptor.options.headerLeftAction || null;
	else 
		headerLeftAction = props.headerLeftAction;

	if (isNavigator)
		HeaderRight = props.scene.descriptor.options.headerRight || null;
	else 
		HeaderRight = props.headerRight || false;

	if (isNavigator) {
		if (props.scene.descriptor.options.title)
			headerTitle = props.scene.descriptor.options.title;
		else
			headerTitle = props.defaultNavigationOptions.title || null;
	} else 
		headerTitle = props.title;

	

	RenderHeaderLeft = () => {
		
		if (isNavigator && props.scene.descriptor.options.headerLeft) return props.scene.descriptor.options.headerLeft;
		
		if (headerLeftAction == 'goBack') {
			return (<TouchableOpacity onPress={() => {NavigationService.goBack()}}>
        		<Icon type='material-community' name='arrow-left' size={24} color="#fff" />
			</TouchableOpacity>);
		} else {
			return (<TouchableOpacity onPress={() => {NavigationService.toggleDrawer()}}>
				<Icon type='material-community'  name='menu' size={24} color="#fff" />
			</TouchableOpacity>);
		}
	}


	
	return (
		<View style={styles.headerContainer}>

			<LinearGradient
				colors={['rgba(0,0,0,.9)', 'rgba(0,0,0,0)']}
				style={styles.linearGradient}
			/>

			<View style={styles.headerStyle}>
				<View style={styles.headerLeftContainerStyle}>
					<RenderHeaderLeft />
				</View>
				{!!headerTitle &&
					<View style={styles.headerTitleContainerStyle}>
						<Text style={styles.headerTitleStyle}>{headerTitle}</Text>
					</View>}
				{!!HeaderRight && 
					<View style={styles.headerRightContainerStyle}>
						<HeaderRight />
					</View>}
			</View>

		</View>
	);
}

//<Header {...props} />

const styles = StyleSheet.create({
	headerContainer : {
		backgroundColor: 'transparent',
		height:50,
		position:'absolute',
		top:0,
		left:0,
		right:0,
		zIndex:100
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

/*const defaultNavigationOptions = {
	headerTransparent : true,
	headerBackground : <LinearGradient
							colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
							style={{...StyleSheet.absoluteFill}}
						/>,
	headerTitleStyle : styles.headerTitleStyle,
	headerLeftContainerStyle : styles.headerLeftContainerStyle,
	headerRightContainerStyle : styles.headerRightContainerStyle,
	headerTitleContainerStyle : styles.headerTitleContainerStyle
}*/

export default GradientHeader;

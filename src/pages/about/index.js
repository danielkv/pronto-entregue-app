import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import Header from '../../navigation/header';
import Business from '../../classes/Business';
import sharedStyles from '../../sharedStyles';

import { ScrollView } from 'react-native-gesture-handler';

export default class BusinessInfo extends Component {

	constructor (props) {
		super(props);
		this.state = {
			business : Business.getInfo(),
		}
	}

	/* componentDidMount() {
		this.setState({business:});
	} */

	renderServiceHours = ([index, day]) => {
		return (
			<View key={index} style={styles.listDay}>
				<Text style={styles.listSmall}>{day.title}</Text>
				{day.hours ? 
					day.hours.map(hour => <Text key={hour.to} style={styles.listBold}>{`${hour.from} - ${hour.to}`}</Text>) : 
					<Text style={styles.listRed}>Fechado</Text>
				}
			</View>
		);
	}

  	render() {
		let {business} = this.state;
		return (
			<View style={styles.container}>

				<Header title={`Sobre a ${business.name}`} />
				
				<ScrollView style={styles.contentContainer}>
					<View style={styles.headerContainer}>
						<View style={styles.businessImageContainer}>
							<Image source={{uri:business.image}} style={styles.businessImage} />
						</View>
						<Text style={styles.businessTitle}>{business.name}</Text>
					</View>
					<View style={styles.infoContainer}>	
						<View style={styles.list}>		
							<View style={styles.listItem}>
								<Icon type='material-community' name='phone' color='#fff' size={20} />
								<View style={styles.listContent}>
									<Text style={styles.listBold}>{business.phone}</Text>
								</View>
							</View>
							<View style={styles.listItem}>
								<Icon type='material-community' name='email' color='#fff' size={20} />
								<View style={styles.listContent}>
									<Text style={styles.listBold}>{business.email}</Text>
								</View>
							</View>
							<View style={styles.listItem}>
								<Icon type='material-community' name='directions' color='#fff' size={20} />
								<View style={styles.listContent}>
									<Text style={styles.listText}>{`${business.address.street}, ${business.address.number}`}</Text>
									<Text style={styles.listText}>{business.address.district}</Text>
									<Text style={styles.listText}>{`${business.address.city} - ${business.address.state}`}</Text>
									<Text style={styles.listText}>{business.address.zipcode}</Text>
								</View>
							</View>
							<View style={styles.listItem}>
								<Icon type='material-community' name='clock-outline' color='#fff' size={20} />
								<View style={styles.listContent}>
									{Object.entries(business.service_hours).map(this.renderServiceHours)}
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
				
			</View>
		)
  	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#336535',
	},
	contentContainer : {
		width:'100%',
	},
	headerContainer:{
		marginTop:80,
		marginBottom:20,
		alignItems:'center',
	},
	businessImageContainer : {
		height:165,
		width:165,
		borderRadius:85,
		backgroundColor:'#fff',
		alignItems:'center',
		justifyContent:'center',
		marginBottom:25,
	},
	businessImage : {
		height:100,
		width:120,
		resizeMode:'contain',
	},
	businessTitle:{
		...sharedStyles.font,
		fontSize:26,
		fontWeight:'bold',
		color:'#fff',
		textAlign:'center',
	},
	infoContainer:{
		// marginHorizontal:50,
		alignItems:'center',
	},
	list : {
		
	},
	listItem:{
		flexDirection:'row',
		alignItems:'flex-start',
		marginBottom:20,
	},
	listContent : {
		marginLeft:15,
	},
	listBold:{
		...sharedStyles.font,
		fontSize:16,
		fontWeight:'bold',
		color:'#fff',
	},
	listRed:{
		...sharedStyles.font,
		fontSize:16,
		fontWeight:'bold',
		color:'#D54141',
	},
	listText:{
		...sharedStyles.font,
		fontSize:14,
		fontWeight:'100',
		color:'#fff',
	},
	listSmall:{
		...sharedStyles.font,
		fontSize:12,
		fontWeight:'100',
		color:'#fff',
	},

	listDay :{
		marginBottom:7,
	},
});
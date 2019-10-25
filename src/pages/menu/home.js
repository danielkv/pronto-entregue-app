import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, ActivityIndicator, ToastAndroid} from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

import sharedStyles from '../../sharedStyles';
import Connection from '../../services/connection';
import NavigationService from '../../NavigationService';
import ProductItem from '../../classes/ProductItem';

export default class HomeScreen extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			categories : null,
			featuredProduct : null,
			loading : true,
		}
	}

	componentDidMount () {
		this.loadHomeContent();
	}

	loadHomeContent = async () => {
		try {
			let response = await Connection.get('get/home');
			this.setState({categories:response.data.categories, featuredProduct: new ProductItem(response.data.featured_product)});
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		} finally {
			this.setState({ loading: false });
		}
	}

	Category = (props) => {
		return (
			<TouchableOpacity style={styles.category} onPress={()=>{NavigationService.navigate('Category', {category:props.category, title:props.category.title})}}>
				<Image style={styles.categoryImage} source={props.sourceImage} />
				<Text style={styles.categoryTitle}>{props.title}</Text>
			</TouchableOpacity>
		);
	}

	render () {
		let {categories, featuredProduct} = this.state;
		return (
			this.state.loading ? <View style={styles.containerLoading}><ActivityIndicator size='small' color='#fff' /></View> : <ScrollView style={styles.container}>
				<TouchableOpacity style={styles.headerContainer} onPress={()=>{NavigationService.navigate('Product', {product:featuredProduct.clone()})}}>
					<ImageBackground source={{uri:featuredProduct.image}} style={styles.headerImageBackground} >

						<LinearGradient
							colors={['rgba(51,101,53,0)', 'rgba(51,101,53,1)']}
							style={styles.headerLinearGradient}
							>
							<Text style={styles.headerTitle}>{featuredProduct.title}</Text>
							<Text style={styles.headerSubtitle}>a partir de R$ 30,00</Text>
						</LinearGradient>

					</ImageBackground>
				</TouchableOpacity>
				<View style={styles.categoriesContainer}>
					<View>
						<Text style={styles.categoriesHeaderTitle}>Mais produtos</Text>
						<Icon type='material-community' name='chevron-down' size={14} color='#fff' />
					</View>
					<View style={styles.categories}>
						{categories.map((row) => {
							return <this.Category title={row.title} sourceImage={{uri:row.image}} category={row} key={row.id.toString()} />
						})}
					</View>
				</View>
				<View style={styles.footer}>
					<Image style={styles.footerImage} source={require('../../images/logo-pizzaria-branco.png')} />
				</View>
			</ScrollView>

		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#336535',
	},
	containerLoading: {
		flex: 1,
		justifyContent:'center',
		backgroundColor: '#336535',
	},
	headerContainer:{
		height:350,
	},
	headerImageBackground:{
		flex:1,
		justifyContent:'flex-end'
	},
	headerLinearGradient:{
		justifyContent:'flex-end',
		paddingTop:30,
		paddingBottom:20,
	},
	headerTitle:{
		...sharedStyles.font,
		color:'#fff',
		fontSize:27,
		textAlign:'center',
		fontWeight:'bold',
		textTransform:'uppercase'
	},
	headerSubtitle:{
		textAlign:'center',
		fontSize:16,
		fontWeight:'100',
		color:'#fff',
	},
	categoriesContainer : {
		padding:20,
	},
	categoriesHeaderTitle : {
		...sharedStyles.font,
		color:'#fff',
		fontSize:21,
		fontWeight:'600',
		textAlign:'center',
		marginBottom:10,
	},
	categories : {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		width: '100%',
	},
	category : {
		paddingHorizontal:25,
		paddingVertical:15,
		height:180,
		width:'50%',
	},
	categoryImage : {
		aspectRatio:1,
		flex:1,
		borderRadius:100,
	},
	categoryTitle : {
		...sharedStyles.font,
		color:'#fff',
		textAlign:'center',
		fontSize:14,
		fontWeight:'100',
		marginTop:8,
		
		paddingHorizontal:13,
		paddingVertical:5,
		borderRadius:20,
		borderWidth:1,
		borderColor: '#FF9100',
	},
	footer : {
		alignItems:'center',
	},
	footerImage : {
		width:111,
		resizeMode: 'contain',
	}
});
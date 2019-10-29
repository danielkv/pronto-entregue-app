import React from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity, BackHandler, ToastAndroid} from 'react-native';
import {Icon} from 'react-native-elements';
import {PanGestureHandler, State, FlatList } from 'react-native-gesture-handler';

import TextInput from '../../components/textInput';
import sharedStyles from '../../sharedStyles';
import ProductOption from '../../components/productOption';
import OptionalItem from '../../classes/OptionalItem';

class OptionsBox  extends React.Component {
	offset = 0;
	backHandler = null;

	state = {
		optional : null,
		restrictedBy : null,

		query : '',
		displayOptions : [],

		max_select : 0,
		min_select : 0,
		qtd_selected : 0,

		amount : 0,
	};

	positionX = new Animated.Value(310);

	onGestureEvent = Animated.event(
		[{
			nativeEvent: {
				translationX : this.positionX,
			}
		}],
		{useNativeDriver : true}
	)

	onHandlerStateChange = (event) => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			const {translationX} = event.nativeEvent;

			this.offset += translationX;
			if (translationX >= 100)
				this.close();
			else {
				this.positionX.setOffset(0);
				this.positionX.setValue(this.offset);
				this.animate(0);
			}
		}
	}

	animate = (toValue, callback) => {
		Animated.timing(this.positionX, {
			toValue: toValue,
			duration: 500,
			useNativeDriver : true
		}).start(() => {
			opened = toValue >= 300 ? false : true;
			this.offset = toValue;
			this.positionX.setOffset(this.offset);
			this.positionX.setValue(0);
			if (callback && typeof callback == 'function') callback();
		});
	}

	open = () => {
		this.offset = 0;
		this.positionX.setOffset(this.offset);
		this.positionX.setValue(310);
		this.animate(0, ()=> {
			this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
				this.close();
				return true;
			})
		});
	}

	close = () => {
		if (this.backHandler) this.backHandler.remove();
		this.animate(310, () => this.clean());
	}

	clean = () => {
		this.setState({
			optional : null,
			amount : 0,
			qtd_selected : 0,
			displayOptions : [],
			query : '',
		});
	}

	initOptional = (optional, restrictedBy) => {
		if (!optional) throw {code:'no_optional_init', message:'Nenhum opcional para iniciar'};
		if (!(optional instanceof OptionalItem)) throw {code:'is_not_optional', message:'Não é um opcional'};

		let _optional = optional.clone();
		
		this.setState({
			optional:_optional,
			displayOptions: _optional.options,
			
			qtd_selected : _optional.getSelectedOptions().length,
			amount : _optional.getTotalAmount(),
		});
	}

	setOptional = (optional, restrictedBy) => {
		try {
			this.initOptional(optional, restrictedBy);
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
			this.close();
		}
	}

	selectOption = (_id) => {
		try {
			
			let _optional = this.state.optional;
			
			if (typeof this.props.onItemPress == 'function' && !this.props.onItemPress(_optional, _optional.getOption(_id))) return;
			
			let _fullOptions = _optional.switchOptionSelect(_id);
			let _options = this.filterQuery(_fullOptions);

			this.setState({
				displayOptions: _options,
				amount : _optional.getTotalAmount(),
				qtd_selected : _optional.getSelectedOptions().length
			});
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		};
	}

	filterQuery = (options, query) => {
		_query = query != undefined ? query : this.state.query;
		
		return options.filter((opt)=> {return _query && _query != '' ? opt.name.toLowerCase().includes(_query.toLowerCase()) : true; });
	}

	cancelSelection = () => {
		this.close();
	}

	finishSelection = () => {
		try {
			if (typeof this.props.onFinishSelection == 'function') this.props.onFinishSelection(this.state.optional);
			this.close();
		} catch (error) {
			ToastAndroid.show(error.message, ToastAndroid.SHORT);
		};
	}

	renderOption = ({item, index}) => {
		let icon;
		if (this.state.optional.selection_type == 'single') icon = item.selected ? 'radiobox-marked' : 'radiobox-blank';
		else icon = item.selected ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline';
		let iconColor = item.selected ? '#FF9100' : '#fff';
		let containerStyle = !item.selected ? styles.option : styles.optionSelected;
		let titleStyle = !item.selected ? {color:'#fff'} : {};
		let containerPriceStyle = !item.selected ? {backgroundColor:'transparent'} : {backgroundColor:'#336535'};
		return (
			<ProductOption 
				title={item.name}
				price={item.price}
				icon={icon} 
				iconColor={iconColor} 
				iconSize={20}
				containerStyle={containerStyle} 
				containerPriceStyle={containerPriceStyle}
				titleStyle={titleStyle}
				onPress={()=>{
					this.selectOption(item.id, item.selected);
				}}
				/>
		)
	}
	
	render () {
		//this.open();
		
		return (
			this.state.optional !== null &&
			<Animated.View style={{...styles.optionsMaskContainer, opacity:this.positionX.interpolate({
				inputRange : [0, 310],
				outputRange : [1, 0],
				extrapolate: "clamp"
			}), transform : [{translateX: this.positionX.interpolate({
					inputRange : [305, 310],
					outputRange : [0, 500],
					extrapolate: "clamp"
				})}]
			}}>
				<PanGestureHandler
					onGestureEvent={this.onGestureEvent}
					onHandlerStateChange={this.onHandlerStateChange}>
					<Animated.View style={{...styles.optionsBoxContainer, transform:[{
						translateX: this.positionX.interpolate({
							inputRange : [0, 310],
							outputRange : [0, 310],
							extrapolate: "clamp"
						})
					}]}}>

						<View style={styles.boxHeader}>
							<TouchableOpacity style={styles.boxLeftHeader} onPress={() => this.close()}>
								<Icon type='material-community' name='close' color='#fff' size={24} />
							</TouchableOpacity>
							<View style={styles.boxTitleContainer}>
								<Text style={styles.boxTitle}>{this.state.optional.title}</Text>
							</View>
							<View style={styles.boxRightHeader}>
								{this.state.optional.selection_type == 'multi' && <Text style={styles.boxCount}>{this.state.qtd_selected}</Text>}
								<Text style={styles.boxPrice}>{this.state.amount.toBRL()}</Text>
								<TouchableOpacity onPress={this.finishSelection}>
									<Icon type='material-community' name='check' color='#fff' size={24} />
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.boxContentContainer}>

							{(this.state.optional.options.length > 10) && <View style={styles.searchContainer}>
								<TextInput placeholder='Buscar' value={this.state.query} onChangeText={(query)=>{
										let displayOptions = this.filterQuery(this.state.optional.options, query);
										this.setState({displayOptions, query});
									}} />
								<TouchableOpacity style={styles.searchButton} onPress={() => {}}>
									<Icon type='material-community' name='magnify' color='#fff' size={20} />
								</TouchableOpacity>
							</View>}

							<FlatList
								containerStyle={styles.optionList}
								data={this.state.displayOptions}
								keyExtractor={(item)=>item.id.toString()}
								renderItem={this.renderOption}
								/>
						</View>

					</Animated.View>
				</PanGestureHandler>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	optionsMaskContainer : {
		backgroundColor:'rgba(0,0,0,.7)',
		...StyleSheet.absoluteFillObject,
		zIndex:500
	},
	optionsBoxContainer : {
		backgroundColor:'#4A844D',
		...StyleSheet.absoluteFillObject,
		left:'auto',
		width:310,
	},
	boxHeader : {
		flexDirection:'row',
		padding:10,
		alignItems:'center'
	},
	boxLeftHeader : {
		
	},
	boxTitleContainer : {
		flex:1,
	},
	boxTitle : {
		...sharedStyles.font,
		color: '#fff',
		fontSize:16,
		marginLeft:10,
		fontWeight: 'normal',
		textAlign:'left'
	},
	boxRightHeader : {
		flexDirection:'row',
		alignItems:'center'
	},
	boxCount : {
		backgroundColor:'#336535',
		width:22,
		height:22,
		borderRadius:11,
		textAlign:'center',

		...sharedStyles.font,
		color: '#fff',
		fontSize:11,
		lineHeight:20,
		marginRight:10,
		fontWeight: '100',
	},
	boxPrice : {
		backgroundColor:'#FF9100',
		borderRadius:3,
		paddingHorizontal:6,
		paddingVertical:3,

		...sharedStyles.font,
		color: '#fff',
		fontSize:12,
		marginRight:10,
		fontWeight: '100',
	},

	boxContentContainer : {
		paddingTop:45,
		paddingHorizontal:25,
		flex:1,
	},
	searchContainer : {
		flexDirection:'row',
		alignItems:'center',
		paddingHorizontal:15,
	},
	searchButton : {
		position:'absolute',
		right:20,
	},

	optionList: {
		flex:1,
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

export default OptionsBox;
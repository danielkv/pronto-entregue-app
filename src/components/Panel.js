import React from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity, BackHandler} from 'react-native';
import {Icon} from 'react-native-elements';
import {PanGestureHandler, State } from 'react-native-gesture-handler';

import sharedStyles from '../sharedStyles';

export default class Panel  extends React.Component {
	constructor (props) {
		super(props);
		this.offset = 0;
		this.backHandler = null;
		this.positionX = new Animated.Value(310);

		this.onGestureEvent = Animated.event(
			[{
				nativeEvent: {
					translationX : this.positionX,
				}
			}],
			{useNativeDriver : true}
		)
	}

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

	close = (callback) => {
		if (this.backHandler) this.backHandler.remove();
		this.animate(310, callback);
	}

	actionClose = () => {
		if (typeof this.props.onClose == 'function') this.props.onClose(this);
		this.close();
	}
	
	/*actionFinish = () => {
		if (typeof this.props.actionFinish == 'function') this.props.actionFinish(this);
		this.close();
	}*/
	
	render () {
		return (
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
							<TouchableOpacity style={styles.boxLeftHeader} onPress={() => this.actionClose()}>
								<Icon type='material-community' name='close' color='#fff' size={24} />
							</TouchableOpacity>
							<View style={styles.boxTitleContainer}>
								<Text style={styles.boxTitle}>{this.props.title}</Text>
							</View>
							{!!this.props.headerRight && 
							<View style={styles.boxRightHeader}>
								<this.props.headerRight />
							</View>}
						</View>

						<View style={styles.boxContent}>{this.props.children}</View>

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
		zIndex:999,
	},
	optionsBoxContainer : {
		backgroundColor:'#4A844D',
		...StyleSheet.absoluteFillObject,
		left:'auto',
		width:310,
		borderTopColor:'#fff',
		borderTopWidth:5,
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
	boxContent : {
		flex:1,
	},
});
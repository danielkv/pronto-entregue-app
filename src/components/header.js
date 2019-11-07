import React from 'react';
import { Header, Icon, Text } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/routers';
import theme from '../theme';

const HeaderTitle = styled(Text)`
	color:#fff;
	font-size:18px;

`;

export default ({previous, scene, navigation}) => {
	const { options } = scene.descriptor;

	const title = scene.route.params && scene.route.params.headerTitle ? scene.route.params.headerTitle :
		options.headerTitle !== undefined
		? options.headerTitle
		: options.title !== undefined
		? options.title
		: scene.route.name;

	const leftComponent = !!previous ? <TouchableOpacity onPress={navigation.goBack}><Icon name='arrow-back' color='#fff' /></TouchableOpacity> :
	<TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}><Icon name='menu' color='#fff' /></TouchableOpacity>;

	return (
		<Header
			containerStyle={{height:theme.header.height, backgroundColor:'transparent', borderBottomWidth:0, alignItems:'center'}}
			leftContainerStyle={{height:theme.header.height}}
			centerContainerStyle={{height:theme.header.height}}
			leftComponent={leftComponent}
			centerComponent={<HeaderTitle h1>{title}</HeaderTitle>}
			ViewComponent={LinearGradient}
			linearGradientProps={{colors: theme.header.background}}
			/>
	)
}
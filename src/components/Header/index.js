/* eslint-disable no-nested-ternary */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';

import { DrawerActions } from '@react-navigation/routers';
import { LinearGradient } from 'expo-linear-gradient';

import theme from '../../theme';
import CartButton from './CartButton';
import { HeaderTitle } from './styles';

export default function  AppHeader({ variant='standard', previous, scene, navigation }) {
	const { options } = scene.descriptor;
	const { params } = scene.route;

	const title = params && params.headerTitle
		? params.headerTitle
		: options.headerTitle !== undefined
			? options.headerTitle
			: options.title !== undefined
				? options.title
				: scene.route.name;
	
	return (
		<Header
			containerStyle={{
				height: theme.header.height,
				backgroundColor: 'transparent',
				borderBottomWidth: 0,
				alignItems: 'center',
				paddingTop: 0,
			}}
			// ViewComponent={LinearGradient}
			
		>
			{previous
				? (
					<TouchableOpacity onPress={navigation.goBack}>
						<Icon name='arrow-back' color='#fff' />
					</TouchableOpacity>
				)
				: (
					<TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}>
						<Icon name='menu' color='#fff' />
					</TouchableOpacity>
				)}
				
			<HeaderTitle h1>{title}</HeaderTitle>

			{params && params.headerRight
				? params.headerRight
				: <CartButton /> }
		</Header>
	)
}
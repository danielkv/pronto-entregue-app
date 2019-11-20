/* eslint-disable no-nested-ternary */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Header, Icon, withBadge } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/routers';

import { HeaderTitle } from './styles';
import theme from '../../theme';
import { GET_CART } from '../../graphql/cart';

export default ({ previous, scene, navigation }) => {
	const { options } = scene.descriptor;

	const { data: { cartItems } } = useQuery(GET_CART);
	// const cartItems = cartItemsData ? [...cartItemsData.cartItems] : [];

	const title = scene.route.params && scene.route.params.headerTitle
		? scene.route.params.headerTitle
		: options.headerTitle !== undefined
			? options.headerTitle
			: options.title !== undefined
				? options.title
				: scene.route.name;
	
	const BadgeIcon = withBadge(cartItems.length,
		{
			hidden: !cartItems.length,
			top: -5,
			left: -16,
			right: 'auto'
		})(Icon);

	return (
		<Header
			containerStyle={{
				height: theme.header.height,
				backgroundColor: 'transparent',
				borderBottomWidth: 0,
				alignItems: 'center',
				paddingTop: 0,
			}}
			ViewComponent={LinearGradient}
			linearGradientProps={{ colors: theme.header.background }}
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
			<TouchableOpacity onPress={()=>navigation.navigate('CartScreen')}><BadgeIcon name='shopping-cart' color='#fff' /></TouchableOpacity>
		</Header>
	)
}
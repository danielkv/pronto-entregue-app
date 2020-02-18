/* eslint-disable no-nested-ternary */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { DrawerActions } from '@react-navigation/routers';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme, Icon, Typography } from "../../react-native-ui";

export default function  AppHeader({ variant='solid', previous, scene, navigation }) {
	const theme = useTheme();
	const { options } = scene.descriptor;
	const { params } = scene.route;

	const ContainerComponent = variant === 'transparent'
		? LinearGradient
		: View

	const iconsColor = variant === 'transparent' ? '#fff' : theme.palette.gray;

	const title = params && params.headerTitle
		? params.headerTitle
		: options.headerTitle !== undefined
			? options.headerTitle
			: options.title !== undefined
				? options.title
				: scene.route.name;
	
	return (
		<ContainerComponent
			style={{
				height: theme.header.height,
				flexDirection: "row",

				borderBottomWidth: 0,
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingHorizontal: 15

			}}
			colors={['#000f', '#0000']}
			// ViewComponent={LinearGradient}
			
		>
			{previous
				? (
					<TouchableOpacity onPress={navigation.goBack}>
						<Icon name='chevron-left' color={iconsColor} />
					</TouchableOpacity>
				)
				: (
					<TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}>
						<Icon name='menu' color={iconsColor} />
					</TouchableOpacity>
				)}
				
			{Boolean(title) && <Typography variant='h3' style={{ color: iconsColor }}>{title}</Typography>}
		</ContainerComponent>
	)
}
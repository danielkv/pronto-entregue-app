/* eslint-disable no-nested-ternary */
import React from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { DrawerActions } from '@react-navigation/routers';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme, Icon, Typography, Avatar, IconButton } from "../../react-native-ui";
import { useLoggedUserId } from '../../utils/hooks';
import { RigthContent } from './styles';

import { GET_USER } from '../../graphql/users';


export default function  AppHeader({ variant='solid', previous, scene, navigation }) {
	const theme = useTheme();
	const { options } = scene.descriptor;
	const { params } = scene.route;

	const loggedUserId = useLoggedUserId();
	const { data: { user = null } ={}, loading: loadingUser } = useQuery(GET_USER, { variables: { id: loggedUserId } })

	const ContainerComponent = variant === 'transparent'
		? LinearGradient
		: View

	const iconsColor = variant === 'transparent' ? '#fff' : theme.palette.background.dark;

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

			<RigthContent>
				<IconButton onPress={()=>{}} icon={{ name: 'search', color: iconsColor }} />
				<IconButton onPress={()=>{}} icon={{ name: 'bell', color: iconsColor }} />
				{loadingUser
					? <ActivityIndicator />
					: <Avatar
						source={{ uri: 'https://s3.amazonaws.com/37assets/svn/1065-IMG_2529.jpg' }}
						alt={user.fullName}
					/>}
			</RigthContent>
		</ContainerComponent>
	)
}
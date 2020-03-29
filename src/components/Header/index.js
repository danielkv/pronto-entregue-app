/* eslint-disable no-nested-ternary */
import React from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme, Icon, Avatar, IconButton } from "../../react-native-ui";
import { useLoggedUserId, useSelectedAddress } from '../../utils/hooks';
import { RigthContent } from './styles';

import { GET_USER } from '../../graphql/users';

export default function  AppHeader({ variant='solid', rigthContent=true, navigation, ...props }) {
	const theme = useTheme();

	const parentState = navigation.dangerouslyGetParent().dangerouslyGetState();
	const canGoBack = parentState?.index > 0 || (navigation.dangerouslyGetState().index > 0 || false);
	const { profileAvatar=true, searchProductsIcon=true, headerTransparent=false } = props?.scene?.descriptor?.options || {};

	const finalVariant = headerTransparent ? headerTransparent === true ? 'transparent' : variant : variant;

	const selectedAddress = useSelectedAddress();
	const loggedUserId = useLoggedUserId();
	const { data: { user = null } = {}, loading: loadingUser } = useQuery(GET_USER, { variables: { id: loggedUserId } })

	const ContainerComponent = finalVariant === 'transparent'
		? LinearGradient
		: View

	const iconsColor = finalVariant === 'transparent' ? '#fff' : theme.palette.background.dark;
	
	return (
		
		<ContainerComponent
			style={{
				height: theme.header.height,
				flexDirection: "row",
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingHorizontal: 15,
				backgroundColor: finalVariant === 'transparent' ? 'transparent' : theme.palette.background.main,
			}}
			colors={['#000d', '#0000']}
		>
			{canGoBack
				&& (
					<TouchableOpacity onPress={navigation.goBack}>
						<Icon name='chevron-left' color={iconsColor} />
					</TouchableOpacity>
				)}
					
			{/* Boolean(title) && <Typography variant='h3' style={{ color: iconsColor }}>{title}</Typography> */}

			{rigthContent && <RigthContent>
				{searchProductsIcon && <IconButton onPress={()=>navigation.navigate('SearchScreen')} icon={{ name: 'search', color: iconsColor }} />}
				{/* <IconButton onPress={()=>{}} icon={{ name: 'bell', color: iconsColor }} /> */}
				{loadingUser
					? <ActivityIndicator />
					: profileAvatar && (
						<TouchableOpacity onPress={()=>{if (selectedAddress) navigation.navigate('ProfileRoutes', { screen: 'ProfileScreen' })}}>
							<Avatar
								source={{ uri: user.image }}
								alt={user.fullName}
								size={40}
							/>
						</TouchableOpacity>
					)}
			</RigthContent>}
		</ContainerComponent>

	)
}
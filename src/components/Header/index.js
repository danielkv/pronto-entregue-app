/* eslint-disable no-nested-ternary */
import React from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme, Icon, Avatar, IconButton } from "../../react-native-ui";
import { useLoggedUserId } from '../../utils/hooks';
import { RigthContent } from './styles';

import { GET_USER } from '../../graphql/users';

export default function  AppHeader({ variant='solid', rigthContent=true, navigation, ...props }) {
	const theme = useTheme();

	const parentState = navigation.dangerouslyGetParent().dangerouslyGetState();
	const canGoBack = parentState?.index > 0 || (navigation.dangerouslyGetState().index > 0 || false);
	const headerTransparent = props?.scene?.descriptor?.options?.headerTransparent || false;

	const finalVariant = headerTransparent ? headerTransparent === true ? 'transparent' : variant : variant;

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
				<IconButton onPress={()=>navigation.navigate('SearchScreen')} icon={{ name: 'search', color: iconsColor }} />
				<IconButton onPress={()=>{}} icon={{ name: 'bell', color: iconsColor }} />
				{loadingUser
					? <ActivityIndicator />
					: <Avatar
						source={{ uri: 'https://s3.amazonaws.com/37assets/svn/1065-IMG_2529.jpg' }}
						alt={user ? user.fullName : ''}
					/>}
			</RigthContent>}
		</ContainerComponent>

	)
}
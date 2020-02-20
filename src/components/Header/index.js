/* eslint-disable no-nested-ternary */
import React from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme, Icon, Avatar, IconButton } from "../../react-native-ui";
import { useLoggedUserId } from '../../utils/hooks';
import { RigthContent } from './styles';

import { GET_USER } from '../../graphql/users';
import { transform } from 'typescript';

export default function  AppHeader({ variant='solid', rigthContent=true, previous, navigation }) {
	const theme = useTheme();

	const loggedUserId = useLoggedUserId();
	const { data: { user = null } ={}, loading: loadingUser } = useQuery(GET_USER, { variables: { id: loggedUserId } })

	const ContainerComponent = variant === 'transparent'
		? LinearGradient
		: View

	const iconsColor = variant === 'transparent' ? '#fff' : theme.palette.background.dark;

	/*const title = params && params.headerTitle
		? params.headerTitle
		: options.headerTitle !== undefined
			? options.headerTitle
			: options.title !== undefined
				? options.title
				: scene.route.name; */
	
	return (
		
		<ContainerComponent
			style={{
				height: theme.header.height,
				flexDirection: "row",
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingHorizontal: 15,
				background: theme.palette.background.main,
			}}
			colors={['#000f', '#0000']}
		>
			{previous
				&& (
					<TouchableOpacity onPress={navigation.goBack}>
						<Icon name='chevron-left' color={iconsColor} />
					</TouchableOpacity>
				)}
					
			{/* Boolean(title) && <Typography variant='h3' style={{ color: iconsColor }}>{title}</Typography> */}

			{rigthContent && <RigthContent>
				<IconButton onPress={()=>{}} icon={{ name: 'search', color: iconsColor }} />
				<IconButton onPress={()=>{}} icon={{ name: 'bell', color: iconsColor }} />
				{loadingUser
					? <ActivityIndicator />
					: <Avatar
						source={{ uri: 'https://s3.amazonaws.com/37assets/svn/1065-IMG_2529.jpg' }}
						alt={user.fullName}
					/>}
			</RigthContent>}
		</ContainerComponent>

	)
}
/* eslint-disable no-nested-ternary */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Icon, IconButton } from "../../react-native-ui";
import Container from './Container';
import { RigthContent } from './styles';
import UserAvatar from './UserAvatar';


export default function  AppHeader({ variant='solid', rigthContent=true, navigation, ...props }) {
	const parentState = navigation.dangerouslyGetParent().dangerouslyGetState();
	const navigationState = navigation.dangerouslyGetState();
	const canGoBack = parentState?.index > 0 || (navigationState.index > 0 || false);
	const { profileAvatar=true, searchProductsIcon=true, headerTransparent=false } = props?.scene?.descriptor?.options || {};

	const finalVariant = headerTransparent ? headerTransparent === true ? 'transparent' : variant : variant;

	const iconsColor = finalVariant === 'transparent' ? '#fff' : '#655A51';
	
	return (
		<View>
			<Container transparent={headerTransparent}>
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
					{profileAvatar && <UserAvatar />}
				</RigthContent>}
			</Container>
		</View>
	)
}
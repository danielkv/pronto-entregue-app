/* eslint-disable no-nested-ternary */
import React from 'react';

import { StatusBar } from 'expo-status-bar';

import { IconButton } from "../../react-native-ui";
import BackButton from './BackButton';
import Container from './Container';
import { RigthContent } from './styles';
import UserAvatar from './UserAvatar';
import SearchButton from '../SearchButton';


export default function AppHeader({ variant = 'solid', showBackButton = true, rigthContent = true, navigation, ...props }) {
	const { profileAvatar = true, searchProductsIcon = true, headerTransparent = false } = props?.scene?.descriptor?.options || {};

	const finalVariant = headerTransparent ? headerTransparent === true ? 'transparent' : variant : variant;

	const iconsColor = finalVariant === 'transparent' ? '#fff' : '#655A51';

	return (
		<Container transparent={headerTransparent}>
			<StatusBar style={finalVariant === 'transparent' ? 'light' : 'dark'} />
			{showBackButton && <BackButton navigation={navigation} color={iconsColor} />}

			{rigthContent && <RigthContent>
				{searchProductsIcon && <SearchButton navigation={navigation} iconsColor={iconsColor} />}
				{/* <IconButton onPress={()=>{}} icon={{ name: 'bell', color: iconsColor }} /> */}
				{profileAvatar && <UserAvatar navigation={navigation} />}
			</RigthContent>}
		</Container>
	)
}
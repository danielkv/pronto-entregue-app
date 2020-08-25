/* eslint-disable no-nested-ternary */
import React from 'react';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { IconButton } from "../../react-native-ui";
import BackButton from './BackButton';
import { RigthContent } from './styles';
import UserAvatar from './UserAvatar';


export default function Header({ variant='solid', showBackButton=true, rigthContent=true, searchIcon=true, profileAvatar=true }) {
	const iconsColor = variant === 'transparent' ? '#fff' : '#655A51';
	const insets = useSafeArea();

	const ContainerComponent = variant == 'transparent'
		? LinearGradient
		: View

	const style = {
		flex: 1,
		flexDirection: "row",
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingTop: insets.top,
		
		
	}

	const bgStyle = {
		height: 70 + insets.top,
		position: variant == 'transparent' ? 'absolute' : 'relative',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 999,
	}

	if (variant !== 'transparent') bgStyle.backgroundColor = '#EFE8DA'
	
	return (
		<View style={bgStyle}>
			<ContainerComponent
				style={style}
				colors={['#000d', '#0000']}
			>
				<StatusBar style={variant === 'transparent' ? 'light' : 'dark'} />
				{showBackButton && <BackButton color={iconsColor} />}

				{rigthContent && <RigthContent>
					{searchIcon && <IconButton style={{ root: { marginRight: 10 } }} onPress={()=>navigation.navigate('SearchScreen')} icon={{ name: 'search', color: iconsColor }} />}
					{/* <IconButton onPress={()=>{}} icon={{ name: 'bell', color: iconsColor }} /> */}
					{profileAvatar && <UserAvatar />}
				</RigthContent>}
			</ContainerComponent>
		</View>
	)
}
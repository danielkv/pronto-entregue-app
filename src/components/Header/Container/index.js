import React from 'react';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';

export default function Container({ children, transparent }) {
	const insets = useSafeArea();
	
	const ContainerComponent = transparent
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
	}

	if (!transparent) bgStyle.backgroundColor = '#EFE8DA'
	
	return (
		<View style={bgStyle}>
			<ContainerComponent
				style={style}
				colors={['#000d', '#0000']}
			>
				{children}
			</ContainerComponent>
		</View>
	);
}

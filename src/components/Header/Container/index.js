import React from 'react';
import { View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

// import { Container } from './styles';

export default function Container({ children, transparent }) {
	
	const ContainerComponent = transparent
		? LinearGradient
		: View
	
	
	const style = {
		flex: 1,
		flexDirection: "row",
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
	}
	
	return (
		<View style={{ height: 70 }}>
			<ContainerComponent
				style={style}
				colors={['#000d', '#0000']}
			>
				{children}
			</ContainerComponent>
		</View>
	);
}

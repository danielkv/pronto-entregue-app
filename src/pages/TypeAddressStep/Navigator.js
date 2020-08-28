import React from 'react';
import { View } from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';

import { Dot } from './styles';

function Navigator({ routes, index=0 }) {
	//const scale = new Animated.Value(1);
	
	
	return <View style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
		{routes.map((_, idx)=>{
			const selected = idx === index
			return <Dot
				key={idx}
				selected={selected}
				style={{
					opacity: selected ? 1 : .5,
					transform: [{
						scale: Animated.interpolate(index, {
							inputRange: [idx-1, idx, idx + 1],
							outputRange: [1, 1.6, 1],
							extrapolate: Extrapolate.CLAMP
						})
					}]
				}}
			/>
		})}
	</View>;
}

export default Navigator;
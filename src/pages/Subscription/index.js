import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useRoute } from '@react-navigation/core';

import BigHeader from '../../components/BigHeader';

import SubscribeIllustration from '../../assets/images/subscribe-ill.png';
import EditUser from './edit_user';
import NewUser from './new_user';

export default function Subscription() {
	const { params: { userId = null } = {} } = useRoute();

	const scrollY = new Animated.Value(0);

	return (
		<View style={{ flex: 1, position: 'relative' }}>
		
			<Animated.ScrollView
				scrollEventThrottle={16}
				style={{ flex: 1 }}
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{ paddingBottom: 50, paddingTop: 200 }}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
			>
				{userId
					? <EditUser userId={userId} />
					: <NewUser />}
			</Animated.ScrollView>

			<BigHeader title={'Cadastrar'} image={SubscribeIllustration} scrollY={scrollY} />
		</View>
	);
}
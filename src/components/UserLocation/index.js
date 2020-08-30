import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { useSelectedAddress } from '../../controller/hooks';
import { Button } from '../../react-native-ui';

export default function UserLocation() {
	const navigation = useNavigation();
	const selectedAddress = useSelectedAddress();
	if (!selectedAddress) return false;

	return (
		<View>
			<Button
				icon={{ name: 'map-pin', size: 16 }}
				onPress={()=>navigation.navigate('AddressRoutes', { screen: 'SelectAddressScreen' })}
				style={{ text: { fontSize: 15 } }}
			>
				{`${selectedAddress.street}, ${selectedAddress.number}`}
			</Button>
		</View>
	);
}

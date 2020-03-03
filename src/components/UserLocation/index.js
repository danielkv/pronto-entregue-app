import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { Button } from '../../react-native-ui';
import { useSelectedAddress } from '../../utils/hooks';

export default function UserLocation() {
	const navigation = useNavigation();
	const selectedAddress = useSelectedAddress();
	if (!selectedAddress) return false;

	return (
		<View>
			<Button
				icon={{ name: 'map-pin', size: 16 }}
				onPress={()=>navigation.navigate('SelectAddressScreen')}
				style={{ text: { fontSize: 15 } }}
			>
				{`${selectedAddress.street}, ${selectedAddress.number}`}
			</Button>
		</View>
	);
}

import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { createGateway } from '../../gateway';

export default function MakePayment({ navigation, route: { params } }) {

	useEffect(() => {
		if (!params.order) navigation.navigate('FeedScreen')
	}, [params.order])

	const Gateway = params.order && createGateway({ cart: params.order, method: params.order.paymentMethod });

	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1 }}>
				{!!Gateway.PageMakePayment && <Gateway.PageMakePayment />}
			</ScrollView>
		</View>
	);
}
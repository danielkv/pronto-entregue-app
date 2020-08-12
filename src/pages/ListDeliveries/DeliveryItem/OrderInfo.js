import React from 'react';
import { View, Image } from 'react-native';

import { Typography } from '../../../react-native-ui';
import { BRL } from '../../../utils/currency';

function OrderInfo ({ order }) {
	return (
		<View style={{ marginBottom: 10 }}>
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
				<View>
					{Boolean(order.paymentMethod) && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Image source={{ uri: order.paymentMethod.image }} style={{ width: 25, height: 25 }} />
						<Typography style={{ fontSize: 15, marginLeft: 5 }}>{order.paymentMethod.displayName}</Typography>
					</View>}
				</View>
				<View>
					<Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>{BRL(order.price).format('$0,00.00')}</Typography>
				</View>
			</View>

			<View>
				<Typography style={{ fontSize: 14 }}>{order.message}</Typography>
			</View>
	
		</View>
	);
}

export default OrderInfo;
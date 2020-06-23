import React from 'react';
import { View } from 'react-native';

import { Typography } from '../../react-native-ui';

// import { Container } from './styles';

function DeliveryAddress({ address, title }) {
	return <View style={{ marginVertical: 8 }}>
		{Boolean(title) && <Typography style={{ fontFamily: 'Roboto-Bold', fontSize: 18, marginBottom: 4 }}>{title}</Typography>}
		<Typography style={{ fontSize: 16 }}>{`${address.street}, n ${address.number}`}</Typography>

		{Boolean(address.reference) && <Typography variant='subtitle'>{address.reference}</Typography>}
		{Boolean(address.complement) && <Typography variant='subtitle'>{address.complement}</Typography>}
		
		<Typography variant='subtitle'>{address.district}</Typography>
		<Typography variant='subtitle'>{`${address.city} - ${address.state}`}</Typography>
		{/* <Typography variant='subtitle'>{address.zipcode}</Typography> */}
	</View>;
}

export default DeliveryAddress;
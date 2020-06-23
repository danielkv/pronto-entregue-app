import React, { useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';

import { useMutation } from '@apollo/react-hooks';

import DeliveryController from '../../../../controller/delivery';
import { Button } from '../../../../react-native-ui';
import { getErrorMessage } from '../../../../utils/errors';

import { CHANGE_DELIVERY_STATUS } from '../../../../graphql/deliveries';


// import { Container } from './styles';

function ActionItems ({ delivery }) {
	const [updatingLoading, setUpdatingLoading] = useState(null);
	const statuses = DeliveryController.availableStatus(delivery)
	
	const [changeDelvieryStatus] = useMutation(CHANGE_DELIVERY_STATUS, { variables: { deliveryId: delivery.id } });

	const handleChangeStatus = (status) => () => {
		setUpdatingLoading(status.slug);
		changeDelvieryStatus({ variables: { newStatus: status.slug } })
			.catch((err)=>{
				Alert.alert('Ops, ocorreu um erro!', getErrorMessage(err))
			})
			.finally(()=>setUpdatingLoading(null))
	}

	return (
		<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
			{statuses.map((stat) => {
				const colors = DeliveryController.statusColors(stat.slug);
				const icon = DeliveryController.statusIcon(stat.slug);
			
				return <Button
					disabled={Boolean(updatingLoading)}
					key={stat.slug}
					onPress={handleChangeStatus(stat)}
					variant='filled'
					icon={updatingLoading === stat.slug ? null : { ...icon, color: delivery.status === stat.slug ? colors.text : '#333', size: 18 }}
					style={{
						button: { backgroundColor: delivery.status === stat.slug ? colors.background : '#ccc', paddingHorizontal: 10, height: 40 },
						text: { fontSize: 13, color: delivery.status === stat.slug ? colors.text : '#333' }
					}}
				>
					{updatingLoading === stat.slug ? <ActivityIndicator color={colors.text} /> : stat.label}
				</Button>
			})}
		</View>
	);
}

export default ActionItems;
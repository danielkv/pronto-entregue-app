import React from 'react';
import { View } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../../../components/ErrorBlock';
import LoadingBlock from '../../../../components/LoadingBlock';
import Panel from '../../../../components/Panel';

import Gateway from '../../../../gateway';
import { Typography, Paper, useTheme } from '../../../../react-native-ui';

import { GET_COMPANY_PAYMENT_METHODS } from '../../../../graphql/companies';

export default function PaymentModal({ confirmModal, closeModal, company }) {
	const { palette } = useTheme();
	const { data: { company: { paymentMethods = [] } = {} } = {}, loading: loadingPaymentMethods, error } = useQuery(GET_COMPANY_PAYMENT_METHODS, {
		variables: { id: company.id }
	});

	const onPressPayment = (method) => {
		confirmModal(method);
	}

	if (loadingPaymentMethods) return <LoadingBlock />
	if (error) return <ErrorBlock error={error} />

	return (
		<Panel
			title='Forma de pagamento'
			handleCancel={closeModal}
			HeaderRight={()=>(<View />)}
		>
			<View style={{ backgroundColor: palette.background.main, paddingHorizontal: 35, paddingVertical: 15, marginVertical: 15 }}>
				<Typography style={{ fontSize: 16, color: palette.background.dark }}>Crédito/Débito na entrega</Typography>
			</View>
			<View style={{ paddingHorizontal: 15 }}>
				{paymentMethods.map((method, index) => (
					<Gateway key={index} step='option' method={method} onPress={()=>onPressPayment(method)} />
				))}
			</View>
		</Panel>
	);
}

import React from 'react';
import { View } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../../../components/ErrorBlock';
import LoadingBlock from '../../../../components/LoadingBlock';
import Panel from '../../../../components/Panel';

import Gateway from '../../../../gateway';
import { Typography, useTheme } from '../../../../react-native-ui';

import { GET_COMPANY_PAYMENT_METHODS } from '../../../../graphql/companies';

export default function PaymentModal({ confirmModal, closeModal, company }) {
	const { palette } = useTheme();
	const { data: { company: { appMethods = [], moneyMethods = [], deliveryMethods = [] } = {} } = {}, loading: loadingPaymentMethods, error } = useQuery(GET_COMPANY_PAYMENT_METHODS, {
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
			{Boolean(appMethods.length) && (
				<>
					<View style={{ backgroundColor: palette.background.main, paddingHorizontal: 35, paddingVertical: 15, marginVertical: 15 }}>
						<Typography style={{ fontSize: 16, color: palette.background.dark }}>Pagar aqui pelo app</Typography>
					</View>
					<View style={{ paddingHorizontal: 15 }}>
						{appMethods.map((method, index) => (
							<Gateway key={index} step='option' method={method} onPress={()=>onPressPayment(method)} />
						))}
					</View>
				</>)}
			{Boolean(moneyMethods.length) && (
				<>
					<View style={{ backgroundColor: palette.background.main, paddingHorizontal: 35, paddingVertical: 15, marginVertical: 15 }}>
						<Typography style={{ fontSize: 16, color: palette.background.dark }}>Pagar em dinheiro na entrega</Typography>
					</View>
					<View style={{ paddingHorizontal: 15 }}>
						{moneyMethods.map((method, index) => (
							<Gateway key={index} step='option' method={method} onPress={()=>onPressPayment(method)} />
						))}
					</View>
				</>)}
			{Boolean(deliveryMethods.length) && (
				<>
					<View style={{ backgroundColor: palette.background.main, paddingHorizontal: 35, paddingVertical: 15, marginVertical: 15 }}>
						<Typography style={{ fontSize: 16, color: palette.background.dark }}>Crédito/Débito na entrega</Typography>
					</View>
					<View style={{ paddingHorizontal: 15 }}>
						{deliveryMethods.map((method, index) => (
							<Gateway key={index} step='option' method={method} onPress={()=>onPressPayment(method)} />
						))}
					</View>
				</>)}
		</Panel>
	);
}

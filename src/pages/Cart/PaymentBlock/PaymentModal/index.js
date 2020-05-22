import React from 'react';
import { View } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import ErrorBlock from '../../../../components/ErrorBlock';
import LoadingBlock from '../../../../components/LoadingBlock';
import Panel from '../../../../components/Panel';

import { createGateway } from '../../../../gateway';
import { Typography, useTheme, Button } from '../../../../react-native-ui';
import { BRL } from '../../../../utils/currency';

import { GET_CART } from '../../../../graphql/cart';
import { GET_COMPANY_PAYMENT_METHODS } from '../../../../graphql/companies';

export default function PaymentModal({ confirmModal, closeModal, company, setUseCredits, cartUseCredits, creditBalance }) {
	const { palette } = useTheme();
	
	const { data: cart } = useQuery(GET_CART);
	const { data: { company: { appMethods = [], moneyMethods = [], deliveryMethods = [] } = {} } = {}, loading: loadingPaymentMethods, error } = useQuery(GET_COMPANY_PAYMENT_METHODS, {
		variables: { id: company.id }
	});

	const onPressPayment = (method) => {
		confirmModal(method);
	}

	if (error) return <ErrorBlock error={error} />

	return (
		<Panel
			title='Forma de pagamento'
			handleCancel={closeModal}
			HeaderRight={()=>(<View />)}
		>
			{loadingPaymentMethods
				? <LoadingBlock />
				: (
					<>
						{creditBalance > 0 && (
							<>
								<View style={{ backgroundColor: palette.background.main, paddingHorizontal: 35, paddingVertical: 15, marginVertical: 15 }}>
									<Typography style={{ fontSize: 16, color: palette.background.dark }}>Créditos</Typography>
								</View>
								<View style={{ marginHorizontal: 20 }}>
									<Button
										icon={cartUseCredits ? 'check-square' : 'square'}
										variant='filled'
										label={`Usar créditos: ${BRL(creditBalance).format()}`}
										onPress={()=>setUseCredits(!cartUseCredits)}
									/>
								</View>
							</>
						)}
						{Boolean(appMethods.length) && (
							<>
								<View style={{ backgroundColor: palette.background.main, paddingHorizontal: 35, paddingVertical: 15, marginVertical: 15 }}>
									<Typography style={{ fontSize: 16, color: palette.background.dark }}>Pagar aqui pelo app</Typography>
								</View>
								<View style={{ paddingHorizontal: 15 }}>
									{appMethods.map((method, index) => {
										const Gateway = createGateway({ method, cart })

										return <Gateway.Option key={index} onPress={onPressPayment} />
									})}
								</View>
							</>)}
						{Boolean(moneyMethods.length) && (
							<>
								<View style={{ backgroundColor: palette.background.main, paddingHorizontal: 35, paddingVertical: 15, marginVertical: 15 }}>
									<Typography style={{ fontSize: 16, color: palette.background.dark }}>Pagar em dinheiro na entrega</Typography>
								</View>
								<View style={{ paddingHorizontal: 15 }}>
									{moneyMethods.map((method, index) => {
										const Gateway = createGateway({ method, cart });

										return <Gateway.Option key={index} onPress={onPressPayment} />
									})}
								</View>
							</>)}
						{Boolean(deliveryMethods.length) && (
							<>
								<View style={{ backgroundColor: palette.background.main, paddingHorizontal: 35, paddingVertical: 15, marginVertical: 15 }}>
									<Typography style={{ fontSize: 16, color: palette.background.dark }}>Crédito/Débito na entrega</Typography>
								</View>
								<View style={{ paddingHorizontal: 15 }}>
									{deliveryMethods.map((method, index) => {
										const Gateway = createGateway({ method, cart });

										return <Gateway.Option key={index} onPress={onPressPayment} />
									})}
								</View>
							</>
				
						)}
					</>
				)}
		</Panel>
	);
}

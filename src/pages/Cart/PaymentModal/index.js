import React from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import LoadingBlock from '../../../components/LoadingBlock';
import ErrorBlock from '../../../components/ErrorBlock';
import Panel from '../../../components/Panel';
import Gateway from '../../../gateway';

import { GET_COMPANY_PAYMENT_METHODS } from '../../../graphql/companies';

export default function deliveryModal({ confirmModal, closeModal }) {
	const company_id = 1; // fix
	const { data: userPaymentMethodsData, loading: loadingPaymentMethods, error } = useQuery(GET_COMPANY_PAYMENT_METHODS, {
		variables: { id: company_id }
	});
	const paymentMethods = userPaymentMethodsData ? userPaymentMethodsData.branch.paymentMethods : [];

	const onPressPayment = (method) => {
		confirmModal({ id: method.id, name: method.name, display_name: method.display_name });
	}

	if (loadingPaymentMethods) return <LoadingBlock />
	if (error) return <ErrorBlock error={error} />

	return (
		<Panel
			title='Método de pagamento'
			handleCancel={closeModal}
			HeaderRight={()=>(<View />)}
		>
			{paymentMethods.map((method, index) => (
				<Gateway key={index} step='option' name={method.name} onPress={()=>onPressPayment(method)} />
			))}
		</Panel>
	);
}

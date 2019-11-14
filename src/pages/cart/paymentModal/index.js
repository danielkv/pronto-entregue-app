import React from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import LoadingBlock from '../../../components/loadingBlock';
import ErrorBlock from '../../../components/errorBlock';
import Panel from '../../../components/panel';
import Gateway from '../../../gateway';

import { LOAD_BRANCH_PAYMENT_METHODS, GET_SELECTED_BRANCH } from '../../../graphql/branches';

export default function deliveryModal({ confirmModal, closeModal }) {
	const { data: selectedBranchData } = useQuery(GET_SELECTED_BRANCH);
	const { data: userPaymentMethodsData, loading: loadingPaymentMethods, error } = useQuery(LOAD_BRANCH_PAYMENT_METHODS, {
		variables: { id: selectedBranchData.selectedBranch }
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

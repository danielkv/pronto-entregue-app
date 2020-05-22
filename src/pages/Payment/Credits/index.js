import React from 'react';
import { View } from 'react-native';

import { useQuery } from '@apollo/react-hooks';

import LoadingBlock from '../../../components/LoadingBlock';

import { useLoggedUserId } from '../../../controller/hooks';
import { Paper, Icon, Typography } from '../../../react-native-ui';
import { BRL } from '../../../utils/currency';

import { GET_USER_CREDITS } from '../../../graphql/users';

// import { Container } from './styles';

function Credits({ cart: { cartPrice, cartDiscount, cartUseCredits } }) {
	const loggedUserId = useLoggedUserId();
	
	const { data: { user: { creditBalance = 0 } = {} } = {}, loading: loadingCredit } = useQuery(GET_USER_CREDITS, { skip: !cartUseCredits, variables: { id: loggedUserId }, fetchPolicy: 'cache-first' });

	const totalCart = cartPrice + cartDiscount;
	const creditsUse = cartUseCredits ? creditBalance >= totalCart ? totalCart : creditBalance : 0;

	if (!cartUseCredits) return false;
	if (loadingCredit) return <LoadingBlock />

	return (
		<Paper style={{  }}>
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 5 }}>
				<Icon name='dollar-sign' size={30} />
				<Typography variant='title'>Crédito</Typography>
			</View>
			<Typography style={{ textAlign: "left", fontSize: 14 }} variant='subtitle'>{`Você está usando ${BRL(creditsUse).format()} de seus créditos para pagar esse pedido`}</Typography>
		</Paper>
	)
}

export default Credits;
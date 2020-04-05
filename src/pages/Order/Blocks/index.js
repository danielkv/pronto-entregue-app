import React from 'react';

import moment from 'moment';

import { useTheme, Icon, Typography } from '../../../react-native-ui';
import {
	Container,
	Block,
	BlocksRow,
	BlockIcon,
	BlockHeader,
	BlockTitle,
	BlockFooter,
	BlockInfo,
} from './styles';
import { BRL } from '../../../utils/currency';


export default function Blocks({ order }) {
	const { palette } = useTheme();

	const displayDate = moment(order.createdAt).format('DD/MM/YY HH:mm');

	return (
		<Container>
			<BlocksRow>
				<Block>
					<BlockHeader>
						<BlockIcon><Icon name='calendar' color={palette.primary.main} /></BlockIcon>
						<BlockTitle>Data</BlockTitle>
					</BlockHeader>
					<BlockFooter>
						<BlockInfo>{displayDate}</BlockInfo>
					</BlockFooter>
				</Block>
				<Block>
					<BlockHeader>
						<BlockIcon><Icon name='dollar-sign' color={palette.primary.main} /></BlockIcon>
						<BlockTitle>Valor total</BlockTitle>
					</BlockHeader>
					<BlockFooter>
						<BlockInfo h1>{BRL(order.price).format()}</BlockInfo>
					</BlockFooter>
				</Block>
			</BlocksRow>
			<BlocksRow>
				<Block>
					<BlockHeader>
						<BlockIcon><Icon name='credit-card' color={palette.primary.main} /></BlockIcon>
						<BlockTitle>Pagamento</BlockTitle>
					</BlockHeader>
					<BlockFooter>
						{order.paymentMethod.type !== 'app' && <Typography variant='subtitle' style={{ textAlign: 'right', fontSize: 13 }}>Na entrega</Typography>}
						<BlockInfo>{order.paymentMethod.displayName}</BlockInfo>
					</BlockFooter>
				</Block>
				<Block>
					<BlockHeader>
						<BlockIcon><Icon name='truck' color={palette.primary.main} /></BlockIcon>
						<BlockTitle>Entrega</BlockTitle>
					</BlockHeader>
					<BlockFooter>
						<Typography variant='subtitle' style={{ textAlign: 'right', fontSize: 13 }}>{order.type === 'takeout' ? 'Retirada no local' : `${order.address.street}, ${order.address.number}`}</Typography>
						{!!order.deliveryPrice && <BlockInfo h1>{BRL(order.deliveryPrice).format()}</BlockInfo>}
					</BlockFooter>
				</Block>
			</BlocksRow>
		</Container>
	);
}

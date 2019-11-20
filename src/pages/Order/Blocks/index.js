import React from 'react';
import { Icon } from 'react-native-elements';

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
import theme from '../../../theme';

export default function Blocks({ order }) {
	return (
		<Container>
			<BlocksRow>
				<Block>
					<BlockHeader>
						<BlockIcon><Icon type='material-community' name='calendar' color={theme.colors.primary} /></BlockIcon>
						<BlockTitle>Data</BlockTitle>
					</BlockHeader>
					<BlockFooter>
						<BlockInfo h1>{order.createdDate}</BlockInfo>
						<BlockInfo h3>{order.createdTime}</BlockInfo>
					</BlockFooter>
				</Block>
				<Block>
					<BlockHeader>
						<BlockIcon><Icon type='material-community' name='currency-usd' color={theme.colors.primary} /></BlockIcon>
						<BlockTitle>Valor total</BlockTitle>
					</BlockHeader>
					<BlockFooter>
						<BlockInfo h1>{`R$ ${order.price.toFixed(2).replace('.', ',')}`}</BlockInfo>
					</BlockFooter>
				</Block>
			</BlocksRow>
			<BlocksRow>
				<Block>
					<BlockHeader>
						<BlockIcon><Icon type='material-community' name='credit-card' color={theme.colors.primary} /></BlockIcon>
						<BlockTitle>Pagamento</BlockTitle>
					</BlockHeader>
					<BlockFooter>
						{!!order.payment_fee && <BlockInfo h4>{`R$ ${order.payment_fee.toFixed(2).replace('.', ',')}`}</BlockInfo>}
						<BlockInfo h1>{order.payment_method.display_name}</BlockInfo>
					</BlockFooter>
				</Block>
				<Block>
					<BlockHeader>
						<BlockIcon><Icon type='material-community' name='truck' color={theme.colors.primary} /></BlockIcon>
						<BlockTitle>Entrega</BlockTitle>
					</BlockHeader>
					<BlockFooter>
						<BlockInfo h4>{order.type === 'takeout' ? 'Retirada no local' : `${order.street}, ${order.number}`}</BlockInfo>
						{!!order.delivery_price && <BlockInfo h1>{`R$ ${order.delivery_price.toFixed(2).replace('.', ',')}`}</BlockInfo>}
					</BlockFooter>
				</Block>
			</BlocksRow>
		</Container>
	);
}

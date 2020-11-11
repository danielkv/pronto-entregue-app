import React, { useState } from 'react';
import { TouchableOpacity, View, Platform, Linking } from 'react-native';
import Modal from 'react-native-modal';

import { useNavigation } from '@react-navigation/core';
import moment from 'moment';

import Address from '../../../components/Address';

import { useTheme, Icon, Typography, Paper, Button, Chip } from '../../../react-native-ui';
import { BRL } from '../../../utils/currency';
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

export default function Blocks({ order }) {
	const { palette } = useTheme();
	const [addressModalOpen, setAddressModalOpen] = useState(false);
	const navigation = useNavigation();

	function handleCloseAddressModal() {
		setAddressModalOpen(false);
	}
	function handleOpenAddressModal() {
		setAddressModalOpen(true);
	}

	function handleOpenCompanyAddress() {
		const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
		const latLng = `${order.company.address.location[0]},${order.company.address.location[1]}`;
		const label = order.company.displayName;
		const url = Platform.select({
			ios: `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`
		});


		Linking.openURL(url);
	}

	const totalOrder = order.price + order.discount;
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
						{Boolean(order.discount) && (
							<>
								<Typography variant='subtitle' style={{ textAlign: 'right', fontSize: 12 }}>{`${BRL(totalOrder).format()}`}</Typography>
								<Typography variant='subtitle' style={{ textAlign: 'right', fontSize: 12 }}>{`-${BRL(order.discount).format()}`}</Typography>
							</>
						)}
						<BlockInfo h1>{BRL(order.price).format()}</BlockInfo>
					</BlockFooter>
				</Block>
			</BlocksRow>
			<BlocksRow>
				{order.status === 'paymentPending' && order.paymentMethod.type === 'app'
					? <TouchableOpacity style={{ width: '47%' }} onPress={() => navigation.navigate('MakePaymentScreen', { order })}>
						<Block style={{ width: '100%' }}>
							<BlockHeader>
								<BlockIcon><Icon name='credit-card' color={palette.primary.main} /></BlockIcon>
								<BlockTitle>Pagamento</BlockTitle>
							</BlockHeader>
							<BlockFooter>
								{order.paymentMethod
									? (
										<>
											{Boolean(order.creditHistory) && <Typography variant='subtitle' style={{ textAlign: 'right', fontSize: 12 }}>Créditos +</Typography>}
											<View style={{ alignItems: 'flex-end' }}>
												<Icon name='alert-circle' size={20} color='#f1ca0d' style={{ root: { margin: 0 } }} />
											</View>
											<BlockInfo>{order.paymentMethod.displayName}</BlockInfo>
											<Typography variant='subtitle' style={{ textAlign: 'right', fontSize: 11 }}>Pressione para pagar</Typography>
										</>
									)
									: Boolean(order.creditHistory) &&
									<>
										<Typography variant='subtitle' style={{ textAlign: 'right', fontSize: 13 }}>Créditos</Typography>
										<BlockInfo>{BRL(Math.abs(order.creditHistory.value)).format()}</BlockInfo>
									</>
								}
							</BlockFooter>
						</Block>
					</TouchableOpacity>
					: <Block>
						<BlockHeader>
							<BlockIcon><Icon name='credit-card' color={palette.primary.main} /></BlockIcon>
							<BlockTitle>Pagamento</BlockTitle>
						</BlockHeader>
						<BlockFooter>
							{order.paymentMethod
								? (
									<>
										{Boolean(order.creditHistory) && <Typography variant='subtitle' style={{ textAlign: 'right', fontSize: 12 }}>Créditos +</Typography>}
										<BlockInfo>{order.paymentMethod.displayName}</BlockInfo>
										{order.paymentMethod.type !== 'app' && <Typography variant='subtitle' style={{ textAlign: 'right', fontSize: 13 }}>Na entrega</Typography>}
									</>
								)
								: Boolean(order.creditHistory) &&
								<>
									<Typography variant='subtitle' style={{ textAlign: 'right', fontSize: 13 }}>Créditos</Typography>
									<BlockInfo>{BRL(Math.abs(order.creditHistory.value)).format()}</BlockInfo>
								</>
							}
						</BlockFooter>
					</Block>}
				{order.type === 'takeout'
					? (
						<TouchableOpacity style={{ width: '47%' }} onPress={handleOpenAddressModal}>
							<Block style={{ width: '100%' }}>
								<BlockHeader>
									<BlockIcon><Icon name='map-pin' color={palette.primary.main} /></BlockIcon>
									<BlockTitle>Retirar</BlockTitle>
								</BlockHeader>
								<BlockFooter>
									<Typography variant='subtitle' style={{ textAlign: 'right', fontSize: 13 }}>{`${order.company.address.street}, ${order.company.address.number}`}</Typography>
								</BlockFooter>
							</Block>
						</TouchableOpacity>)

					: (<Block>
						<BlockHeader>
							<BlockIcon><Icon name='truck' color={palette.primary.main} /></BlockIcon>
							<BlockTitle>Entrega</BlockTitle>
						</BlockHeader>
						<BlockFooter>
							<Typography variant='subtitle' style={{ textAlign: 'right', fontSize: 13 }}>{order.type === 'takeout' ? 'Retirada no local' : `${order.address.street}, ${order.address.number}`}</Typography>
							{!!order.deliveryPrice
								&& order?.coupon?.freeDelivery
								? <Chip style={{ root: { height: 22, paddingHorizontal: 10, marginTop: 3, alignSelf: 'flex-end' }, text: { textTransform: 'uppercase', fontSize: 12 } }} label='grátis' />
								: <BlockInfo h1>{BRL(order.deliveryPrice).format()}</BlockInfo>}
						</BlockFooter>
					</Block>)
				}
			</BlocksRow>
			<Modal
				isVisible={addressModalOpen}
				onModalHide={handleCloseAddressModal}
				onSwipeComplete={handleCloseAddressModal}
				onBackButtonPress={handleCloseAddressModal}
				onBackdropPress={handleCloseAddressModal}
				animationIn='slideInUp'
				animationOut='slideOutDown'
				style={{ marginHorizontal: 10 }}
				swipeDirection='down'
				propagateSwipe={false}
			>
				<Paper>
					<View style={{ marginBottom: 10 }}>
						<Typography variant='title'>Endereço do estabelecimento</Typography>
					</View>
					<Address item={order.company.address} />
					<Button onPress={handleOpenCompanyAddress} variant='filled' color='secondary' icon='map' label='Abrir mapa' />
					<Button onPress={handleCloseAddressModal} variant='outlined' label='Fechar' />
				</Paper>
			</Modal>
		</Container>
	);
}

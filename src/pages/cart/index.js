import React, { useState } from 'react';
import { Input, Icon } from 'react-native-elements';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import CartButton from '../../components/cartButton';
import {
	Container,
	CartContainer,
	Section,
	SectionTitle,
	SectionContent,
	CardContainer,
	CardHeader,
	CardContent,
	CardTitle,
	CardInfo,
	CardPrice,
	CartButtonContainer,
	CancelButton,
	CancelButtonText,
} from './styles';
import theme from '../../theme';
import CartItem from './cartItem';
import LoadingBlock from '../../components/loadingBlock';
import ErrorBlock from '../../components/errorBlock';

import { GET_CART_ITEMS, GET_CART_PAYMENT, GET_CART_DELIVERY } from '../../graphql/cart';

export default function Cart() {
	const [observations, setObservations] = useState('');

	const { data: cartItemsData, loading: loadingCartItems, error } = useQuery(GET_CART_ITEMS);
	const { data: cartDeliveryData, loading: loadingCartDelivery } = useQuery(GET_CART_DELIVERY);
	const { data: cartPaymentData, loading: loadingCartPayment } = useQuery(GET_CART_PAYMENT);

	const cartItems = cartItemsData ? cartItemsData.cartItems : [];
	const cartDelivery = cartDeliveryData ? cartDeliveryData.cartDelivery : null;
	const cartPayment = cartPaymentData ? cartPaymentData.cartPayment : null;

	if (loadingCartItems || loadingCartDelivery || loadingCartPayment) return <LoadingBlock />;
	if (error) return <ErrorBlock error={error} />

	return (
		<Container>
			<CartContainer>
				<Section>
					<SectionTitle>
						{`${cartItems.length} ${cartItems.length > 1 ? 'itens' : 'item'}`}
					</SectionTitle>
					<SectionContent>
						{cartItems.map((item, index)=><CartItem key={index} item={item} />)}
					</SectionContent>
				</Section>
				<Section>
					<SectionTitle>Entrega e pagamento</SectionTitle>
					<CardContainer onPress={()=>{}}>
						<CardHeader>
							<Icon type='material-community' name='truck' color={theme.colors.divider} size={24} />
							<CardTitle>Entrega</CardTitle>
						</CardHeader>
						<CardContent>
							<CardInfo>{cartDelivery ? cartDelivery.title : 'Nenhum endereço selecionado'}</CardInfo>
							<Icon type='material-community' name='pencil' color={theme.colors.divider} size={24} />
							{!!(cartDelivery && cartDelivery.price) && <CardPrice>{cartDelivery.price.toBRL()}</CardPrice>}
						</CardContent>
					</CardContainer>
					<CardContainer onPress={()=>{}}>
						<CardHeader>
							<Icon type='material-community' name='credit-card' color={theme.colors.divider} size={24} />
							<CardTitle>Pagamento</CardTitle>
						</CardHeader>
						<CardContent>
							<CardInfo>{cartPayment ? cartPayment.title : 'Nenhum pagamento selecionado'}</CardInfo>
							<Icon type='material-community' name='pencil' color={theme.colors.divider} size={20} />
						</CardContent>
					</CardContainer>
				</Section>
				<Section>
					<SectionTitle>Observações</SectionTitle>
					<SectionContent>
						<Input
							value={observations}
							onChangeText={(text)=>setObservations(text)}
							multiline
						/>
					</SectionContent>
				</Section>
			</CartContainer>

			<CartButtonContainer>
				<CartButton
					title='Finalizar pedido'
					forceShowPrice
					price={0}
					onPress={()=>{}}
				/>
				<CancelButton>
					<CancelButtonText>Cancelar pedido</CancelButtonText>
				</CancelButton>
			</CartButtonContainer>
		

			{/* 
		</View>
			{this.state.deliveryOpen && 
				<Panel ref={(panel)=>{this.deliveryPanel = panel;}} title='Endereço de entrega' headerRight={()=>(
					<TouchableOpacity onPress={() => {NavigationService.navigate('Add_Address', {fromCart:true})}}>
						<Icon type='material-community' name='plus' color='#fff' size={24} />
					</TouchableOpacity>
				)}>
					<DeliveryMethods onSelectItem={(method)=>{
						this.deliveryPanel.close(()=>{
							try {
								let delivery = Cart.setDelivery(method);
								this.setState({delivery, deliveryOpen:false});
							} catch (error) {
								ToastAndroid.show(error.message, ToastAndroid.LONG);
							}
						});
					}} />
				</Panel>
			}

			{this.state.paymentOpen && 
				<Panel ref={(panel)=>{this.paymentPanel = panel;}} title='Forma de Pagamento'>
					<PaymentMethods onSelectItem={(method)=>{
						this.paymentPanel.close(()=>{
							try {
								let payment = Cart.setPayment(method);
								this.setState({payment, paymentOpen:false});
							} catch (error) {
								ToastAndroid.show(error.message, ToastAndroid.SHORT);
							}
						});
					}} />
				</Panel>
			} */}
		</Container>
	);
}

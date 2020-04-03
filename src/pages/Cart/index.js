import React, { useState, useCallback, useMemo, Fragment } from 'react';
import { Alert, View, Image } from 'react-native';

import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/core';

import CartButton from '../../components/CartButton';
import CartItem from '../../components/CartItem';
import ErrorBlock from '../../components/ErrorBlock';
import LoadingBlock from '../../components/LoadingBlock';

import { Button, Paper, Typography, Chip, Divider, TextField, useTheme } from '../../react-native-ui';
import { checkCondition } from '../../utils';
import { calculateOrderPrice, validadeCart } from '../../utils/cart';
import { getErrorMessage } from '../../utils/errors';
import { useKeyboardStatus } from '../../utils/hooks';
import DeliveryBlock from './DeliveryBlock';
import PaymentBlock from './PaymentBlock';
import {
	Container,
	CartButtonContainer,
	CartContainerScroll,
} from './styles';

import {
	REMOVE_CART_ITEM,
	CANCEL_CART,
	GET_CART,
} from '../../graphql/cart';

export default function Cart({ navigation }) {
	const { palette } = useTheme();
	const [message, setMessage] = useState('');

	const keyboardOpen = useKeyboardStatus();
	
	const client = useApolloClient();
	
	const [removeOrderItem] = useMutation(REMOVE_CART_ITEM);
	const [cancelCart] = useMutation(CANCEL_CART);
	
	const { data: { cartItems, cartDelivery, cartCompany, cartPayment, cartDiscount }, loading: loadingCart, error } = useQuery(GET_CART);
	
	const cartPrice = useMemo(()=>{
		const paymentPrice = cartPayment?.price || 0;
		const deliveryPrice = cartDelivery?.price || 0;

		return calculateOrderPrice(cartItems, paymentPrice + deliveryPrice - cartDiscount);
	}, [cartItems, cartDelivery, cartPayment, cartDiscount]);

	const handleRemoveOrderItem = (item) => () => {
		Alert.alert(
			`Remover ${item.name}`,
			'tem certeza que deseja remover esse item da cesta',
			[
				{ text: 'Sim', onPress: ()=>removeOrderItem({ variables: { id: item.id } }) },
				{ text: 'Cancelar' },
			]
		);
	}

	const handleFinishCart = () => {
		try {
			validadeCart({ cartItems, cartDelivery, cartPayment, cartCompany });
			client.writeData({ data: { cartMessage: message, cartDiscount, cartPrice } });

			navigation.navigate('PaymentScreen');
		} catch (err) {
			Alert.alert(err.message);
		}
	}

	const handleCancelCart = () => {
		Alert.alert(
			'Limpar cesta',
			'Tem certeza que deseja limpar sua cesta de itens?',
			[
				{ text: 'Sim', onPress: ()=>cancelCart() },
				{ text: 'Não' },
			]
		);
	}
	
	// navigate to HomeRoutes if there's no items in Cart
	const checkConditionCB = useCallback(() => {
		checkCondition((cartItems && cartItems.length && cartCompany), navigation, 'A cesta está vazia')
	}, [])
	useFocusEffect(checkConditionCB);
	
	if (loadingCart) return <LoadingBlock />;
	if (error) return <ErrorBlock error={getErrorMessage(error)} />
	
	return (
		<Container>
			
			<CartContainerScroll>
				{cartCompany && <Paper style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image source={{ uri: cartCompany.image }} style={{ width: 60, height: 60, borderRadius: 15, marginRight: 15 }} />
					<Typography style={{ flex: 1, fontSize: 18, color: '#333', fontWeight: 'bold', marginRight: 15 }}>{cartCompany.displayName}</Typography>
					<View style={{ marginLeft: 'auto' }}>
						<Chip color='secondary' label={`${cartItems.length} ${cartItems.length > 1 ? 'itens' : 'item'}`} style={{ root: { height: 30 } }} />
					</View>
				</Paper>}
				<DeliveryBlock />
				<Paper>
					<Typography variant='title'>Itens</Typography>
					<View style={{ marginTop: 35 }}>
						{cartItems.map((item, index)=>(
							<Fragment key={`item_${item.id}_${index}`}>
								{index > 0 && <Divider />}
								<CartItem item={item} onPressDelete={handleRemoveOrderItem(item)} />
							</Fragment>
						))}
					</View>
				</Paper>
				<PaymentBlock />
				<Paper>
					<Typography variant='title'>Observações</Typography>
					<TextField
						style={{
							inputContainer: { backgroundColor: palette.background.main, height: 180 }
						}}
						onChangeText={(text)=>setMessage(text)}
						textAlignVertical='top'
						multiline
						numberOfLines={8}
					/>
				</Paper>
				{Boolean(cartItems && cartCompany) && <Paper>
					<Button variant='filled' style={{ button: { height: 40, backgroundColor: palette.error.main } }} onPress={handleCancelCart}>Limpar Cesta</Button>
					<Typography style={{ color: '#666', textAlign: 'center' }}>Isso irá limpar todos os itens da sua cesta.</Typography>
				</Paper>}
			</CartContainerScroll>
			{!keyboardOpen &&
				(<CartButtonContainer>
					<CartButton
						title='Confirmar pedido'
						forceShowPrice
						price={cartPrice}
						onPress={handleFinishCart}
					/>
					
				</CartButtonContainer>)
			}
		</Container>
	);
}

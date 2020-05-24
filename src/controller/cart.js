import client from "../services/apolloClient";
import { sanitizeAddress } from "./address";
import { calculateProductPrice } from "./products";

import { LOGGED_USER_ID } from "../graphql/authentication";
import { GET_CART } from "../graphql/cart";
import { GET_USER } from "../graphql/users";

export function calculateOrderPrice(products, initialValue = 0) {
	if (!products || !products.length) return initialValue;
	return parseFloat(products.reduce((totalProduct, product) => {
		return totalProduct + (calculateProductPrice(product, false) * product.quantity);
	}, initialValue));
}

export async function validateCart() {
	const { cartItems, cartDelivery, cartPayment, cartCompany, cartUseCredits, cartPrice } = client.readQuery({ query: GET_CART })
	
	const { loggedUserId } = client.readQuery({ query: LOGGED_USER_ID })
	if (!loggedUserId) throw new Error('Seu usuário não está logado corretamente');

	const { data: { user } } = await client.query({ query: GET_USER, variables: { id: loggedUserId } });
	if (!user) throw new Error('Seu usuário não está logado corretamente');

	if (!user.phones.length || !user.cpf.length) {
		let message;
		if (!user.phones.length && user.cpf.length)
			message = 'Precisamos do seu telefone, para o caso de não consiguirmos te encontrar.';
		else if (user.phones.length && !user.cpf.length)
			message = 'Se fosse por nós nem precisaria, mas é necessário seu CPF para finalizar o pedido.';
		else
			message = 'Faltaram seu CPF e seu telefone, precisamos dessas informações para finalizar seu pedido.';
			
		const error = new Error(message);

		error.type = 'USER_NO_PHONE_NUMBER';
		throw error;
	}
	
	if (!cartCompany || cartItems.length === 0) throw new Error('Não há nenhum item no carrinho');
	
	if (!cartDelivery || !cartDelivery.type) throw new Error('Selecione um tipo de entrega');

	if (cartPrice > 0 && (!cartPayment || !cartPayment?.id)) {
		let errorMessage;
		if (cartUseCredits) errorMessage = 'Selecione uma forma de pagamento para completar o valor';
		else errorMessage = 'Selecione uma forma de pagamento';

		const error = new Error(errorMessage);

		error.type = 'CART_PAYMENT'
		throw error;
	}

	return true;
}

export function sanitizeOrderData ({ userId, user, address, cartCompany, cartItems, cartStatus, cartPrice, cartMessage, cartDiscount, cartDelivery, cartPayment, cartUseCredits }) {
	return {
		userId: userId || user.id,
		type: cartDelivery.type,
		status: cartStatus || 'waiting',
		paymentMethodId: cartPayment?.id || null,
		useCredits: cartUseCredits || false,
		companyId: cartCompany.id,

		paymentFee: cartPayment?.price || 0,
		deliveryPrice: cartDelivery.price || 0,
		deliveryTime: cartCompany.deliveryTime || 0,
		discount: cartDiscount || 0,
		price: cartPrice,
		message: cartMessage,
		
		address: sanitizeAddress(address),
		
		products: cartItems.map(product => ({
			action: 'create',
			name: product.name,
			price: product.price,
			quantity: product.quantity,
			message: product.message || '',
			productRelatedId: product.productId,

			optionsGroups: product.optionsGroups?.map(group => ({
				name: group.name,
				optionsGroupRelatedId: group.optionsGroupId,

				options: group.options?.map(option => ({
					name: option.name,
					description: option.description,
					price: option.price,
					optionRelatedId: option.optionId,
				})) || []
			})) || []
		}))
	}
}
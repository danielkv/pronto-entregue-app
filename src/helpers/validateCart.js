import client from '../services/apolloClient';

import { GET_SELECTED_ADDRESS } from '../graphql/addresses';
import { LOGGED_USER_ID } from '../graphql/authentication';
import { GET_CART } from '../graphql/cart';
import { GET_USER } from '../graphql/users';

export async function validateCart(args) {
	const { cartItems, cartScheduled, cartDelivery, cartPayment, cartCompany, cartUseCredits, cartPrice } = client.readQuery({ query: GET_CART })
	
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
	
	if (args.schedulableProducts.length && !cartScheduled) throw new Error('Selecione uma data para receber seu pedido')

	// checks if address is saved
	const { selectedAddress: address } = client.readQuery({ query: GET_SELECTED_ADDRESS })
	console.log(address);
	if (!address.id || address.id === 'temp') {
		const addressError = new Error('Como é a primeira vez que você compra para esse endereço, vamos verifica-lo');
		addressError.type = 'ADDRESS_NOT_CREATED';

		throw addressError;
	}

	return true;
}
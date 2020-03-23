import { sanitizeAddress } from "../controller/address";

export const calculateOrderPrice = (products, initialValue = 0) => {
	if (!products || !products.length) return initialValue;
	return parseFloat(products.reduce((totalProduct, product) => {
		return totalProduct + product.price;
	}, initialValue));
}

export const validadeCart = ({ cartItems, cartDelivery, cartPayment }) => {
	if (cartItems.length === 0) throw new Error('Não há nenhum item no carrinho');

	if (!cartDelivery || !cartDelivery.type) throw new Error('Selecione um tipo de entrega');
	
	if (!cartPayment || !cartPayment.id || !cartPayment.name) throw new Error('Selecione uma método de pagamento');

	return true;
}

export const sanitizeOrderData = ({ userId, user, address, cartCompany, cartItems, cartStatus, cartPrice, cartMessage, cartDiscount, cartDelivery, cartPayment }) => {
	return {
		userId: userId || user.id,
		type: cartDelivery.type,
		status: cartStatus || 'waiting',
		paymentMethodId: cartPayment.id,
		companyId: cartCompany.id,

		paymentFee: cartPayment.price || 0,
		deliveryPrice: cartDelivery.price || 0,
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
			productRelatedId: product.id,

			optionsGroups: product.optionsGroups?.map(group => ({
				name: group.name,
				optionsGroupRelatedId: group.id,

				options: group.options?.map(option => ({
					name: option.name,
					price: option.price,
					optionRelatedId: option.id,
				})) || []
			})) || []
		}))
	}
}
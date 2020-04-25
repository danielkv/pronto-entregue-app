import { sanitizeAddress } from "./address";
import { calculateProductPrice } from "./products";

export function calculateOrderPrice(products, initialValue = 0) {
	if (!products || !products.length) return initialValue;
	return parseFloat(products.reduce((totalProduct, product) => {
		return totalProduct + (calculateProductPrice(product, false) * product.quantity);
	}, initialValue));
}

export function validadeCart({ cartItems, cartDelivery, cartPayment, cartCompany }) {
	if (!cartCompany || cartItems.length === 0) throw new Error('Não há nenhum item no carrinho');

	if (!cartDelivery || !cartDelivery.type) throw new Error('Selecione um tipo de entrega');
	
	if (!cartPayment || !cartPayment.id) {
		const error = new Error('Selecione uma método de pagamento');
		error.type = 'NO_PAYMENT_METHOD'
		throw error;
	}

	return true;
}

export function sanitizeOrderData ({ userId, user, address, cartCompany, cartItems, cartStatus, cartPrice, cartMessage, cartDiscount, cartDelivery, cartPayment }) {
	return {
		userId: userId || user.id,
		type: cartDelivery.type,
		status: cartStatus || 'waiting',
		paymentMethodId: cartPayment.id,
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
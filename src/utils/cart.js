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

export const sanitizeOrderData = ({ user, cartItems, cartStatus, cartPrice, cartMessage, cartDiscount, cartDelivery, cartPayment }) => {
	return {
		user_id: user.id,
		status: cartStatus || null,
		price: cartPrice,
		message: cartMessage,
		discount: cartDiscount || 0,
		
		payment_method_id: cartPayment.id,
		payment_fee: cartPayment.price || 0,

		type: cartDelivery.type,
		delivery_price: cartDelivery.price || 0,
		
		street: cartDelivery.address && cartDelivery.address.street ? cartDelivery.address.street : null,
		number: cartDelivery.address && cartDelivery.address.number ? cartDelivery.address.number : null,
		complement: cartDelivery.address && cartDelivery.address.complement ? cartDelivery.address.complement : null,
		city: cartDelivery.address && cartDelivery.address.city ? cartDelivery.address.city : null,
		state: cartDelivery.address && cartDelivery.address.state ? cartDelivery.address.state : null,
		district: cartDelivery.address && cartDelivery.address.district ? cartDelivery.address.district : null,
		zipcode: cartDelivery.address && cartDelivery.address.zipcode ? cartDelivery.address.zipcode : null,
		
		products: cartItems.map(product => ({
			action: 'create',
			name: product.name,
			price: product.price,
			quantity: product.quantity,
			message: product.message || '',
			product_id: product.id,

			options_groups: product.options_groups.map(group => ({
				name: group.name,
				options_group_id: group.id,

				options: group.options.map(option => ({
					name: option.name,
					price: option.price,
					item_id: option.item ? option.item.id : null,
					option_id: option.id,
				}))
			}))
		}))
	}
}
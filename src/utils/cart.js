export const calculateOrderPrice = (products, initialValue = 0) => {
	if (!products || !products.length) return initialValue;
	return parseFloat(products.reduce((totalProduct, product) => {
		return totalProduct + product.price;
	}, initialValue));
}

export const validadeCart = (items, delivery, payment) => {
	if (items.length === 0) throw new Error('Não há nenhum item no carrinho');

	if (!delivery || !delivery.type) throw new Error('Selecione um tipo de entrega');
	
	if (!payment || !payment.id) throw new Error('Selecione uma método de pagamento');

	return true;
}
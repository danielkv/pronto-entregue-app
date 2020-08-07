import calculateProductPrice from "./calculateProductPrice";

export default function calculateOrderPrice(products, initialValue = 0) {
	if (!products || !products.length) return initialValue;

	return parseFloat(products.reduce((totalProduct, product) => {
		
		return totalProduct + (calculateProductPrice(product, false) * product.quantity);

	}, initialValue));
}
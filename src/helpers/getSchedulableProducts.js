import _ from 'lodash';

export default function getSchedulableProducts(products) {
	const schedulableProducts = products.filter(product=>product.scheduleEnabled);

	schedulableProducts.sort((a, b)=>{
		const timeA = _.toInteger(a.minDeliveryTime);
		const timeB = _.toInteger(b.minDeliveryTime);
		if (timeA < timeB) return 1;
		if (timeA > timeB) return -1;

		return 0
	})

	return schedulableProducts
}
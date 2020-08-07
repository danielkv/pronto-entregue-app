import calculateOptionsGroupPrice from "./calculateOptionsGroupPrice";
import getProductFinalPrice from "./getProductFinalPrice";

export default function calculateProductPrice(product, filterSelected=true) {
	const productPrice = getProductFinalPrice(product);
	
	return product.optionsGroups.reduce((totalGroup, group) => {
	
		return calculateOptionsGroupPrice(group, totalGroup, filterSelected);
	}, productPrice);
}


export const calculateOptionsGroupPrice = (optionsGroup, initialValue = 0) => {
	if (!optionsGroup) return 0;
	return optionsGroup.options.reduce((totalOption, option) => {
		return (option.selected) ? totalOption + option.price : totalOption;
	}, initialValue);
}

export const calculateProductPrice = (product) => {
	const r = product.options_groups.reduce((totalGroup, group) => {
		return calculateOptionsGroupPrice(group, totalGroup);
	}, product.price);
	return r;
};

export const calculateOrderPrice = (products, initialValue = 0) => {
	if (!products || !products.length) return initialValue;
	return parseFloat(products.filter(row => row.action !== 'remove').reduce((totalProduct, product) => {
		return totalProduct + calculateProductPrice(product);
	}, initialValue).toFixed(2).replace(',', '.'));
}

export function getOptionNewState(group, option) {
	if (option.selected) return false;
	let { max_select } = group;

	// Check if max_select option is restrained by other option
	/* if (option.restrainedBy) {

	} */
	
	const selectedOptions = group.options.filter(opt=>opt.selected);
	if (group.type === 'single') {
		if (selectedOptions.length) throw new Error('Você pode selecionar apenas uma opção');
		return true;
	}
	
	if (group.type === 'multi') {
		if (selectedOptions.length === max_select) throw new Error(`Você pode selecionar apenas ${max_select} opções`);
		return true;
	}

	throw new Error('Ocorreu algum erro');
}
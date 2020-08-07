export default function calculateOptionsGroupPrice (optionsGroup, initialValue = 0, filterSelected=true) {
	if (!optionsGroup) return 0;
	let optionsGroupValue = 0;
	const options = filterSelected ? optionsGroup.options.filter(o => o.selected) : optionsGroup.options;

	if (optionsGroup.priceType === 'sum') {
		// case group should SUM all selected options' prices

		optionsGroupValue = options.reduce((totalOption, option) => {
			return totalOption + option.price;
		}, 0);
	} else if (optionsGroup.priceType === 'higher') {
		// case group should consider only the highest selected options' prices

		if (options.length) {
			options.sort((a, b) => a.price > b.price ? -1 : 1);
			optionsGroupValue = options[0].price;
		}
	}
	
	return optionsGroupValue + initialValue;
}
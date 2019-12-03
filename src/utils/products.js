import { uniqueId, cloneDeep } from 'lodash';

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

/**
 * Return group new state after select option
 * 
 * @param {*} group 
 * @param {*} optionId 
 */

export function getGroupNewState(optionGroup, optionId) {
	const group = cloneDeep(optionGroup);
	
	if (group.type === 'single') {
		const selectedOptionIndex = group.options.findIndex(opt => opt.selected);
		if (selectedOptionIndex > -1) group.options[selectedOptionIndex].selected = false;
	}

	const optionIndex = group.options.findIndex(opt => opt.id === optionId)
	const option = group.options[optionIndex];
	option.selected = getOptionNewState(group, option);
	group.options.splice(optionIndex, 1, option);
	
	return group;
}

export function getOptionNewState(group, option) {
	if (option.selected) return false;
	
	return checkGroupRules(group, 1);
}

export function checkGroupRules(group, selectionOffset = 0) {
	let { max_select } = group;
	const { min_select } = group;
	const selectedOptions = group.options.filter(opt=>opt.selected);
	const selectionLength = selectedOptions.length + selectionOffset;

	// Check restraining group max selection
	if (group.restrainedBy && group.restrainedBy.options) {
		const otherOption = group.restrainedBy.options[0];
		max_select = otherOption.max_select_restrain_other;
	}
	
	// Check the min selection rule
	if (min_select !== 0 && selectionLength < min_select) {
		throw new Error(`Você deve selecionar no mínimo ${min_select} ${min_select > 1 ? 'opções' : 'opção'} em ${group.name}`)
	}

	// Check the max selection rule
	if (max_select !== 0 && selectionLength > max_select) {
		if (max_select === 1) throw new Error(`Você pode selecionar apenas 1 opção em ${group.name}`);
		throw new Error(`Você pode selecionar apenas ${max_select} opções em ${group.name}`);
	}
	
	// if all rules above match, return true
	return true;
}

export function getGroupRestrainingRules(optionsGroups, selectedGroup) {
	if (selectedGroup.restrainedBy) {
		const otherGroup = optionsGroups.find(group=>group.id === selectedGroup.restrainedBy.id);
		if (!otherGroup) throw new Error('Não foi possível encontrar o grupo anterior');

		const otherGroupSelectedOptions = otherGroup.options.filter(opt=>opt.selected);
		if (!otherGroupSelectedOptions.length) throw new Error(`Primeiro selecione: ${otherGroup.name}`);

		return { ...selectedGroup, restrainedBy: { ...otherGroup, options: otherGroupSelectedOptions } }
	}
	return selectedGroup;
}

export function checkProductRules(product) {
	product.options_groups.forEach((group)=>{
		const groupWithRules = getGroupRestrainingRules(product.options_groups, group);
		checkGroupRules(groupWithRules);
	});
	return true;
}

export const sanitizeCartData = (data) => {
	return {
		id: uniqueId(),
		product_id: data.id,
		image: data.image,
		name: data.name,
		price: data.price,
		quantity: data.quantity,
		message: data.message || '',
		__typename: 'CartItem',

		options_groups: data.options_groups.filter(group=>group.options.some(option=>option.selected)).map(group =>{
			return {
				id: uniqueId(),
				name: group.name,
				options_group_id: group.id,
				__typename: 'CartOptionsGroup',

				options: group.options.filter(option=>option.selected).map(option => {
					return {
						id: uniqueId(),
						name: option.name,
						price: option.price,
						option_id: option.id,
						__typename: 'CartOption',
					};
				})
			}
		})
	}
}
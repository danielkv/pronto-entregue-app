import { uniqueId, cloneDeep, isEqual } from 'lodash';
import moment from 'moment';

import client from '../services/apolloClient';
import { CartValidationError } from '../utils/errors';
import * as CartController from './cart';

import { GET_CART } from '../graphql/cart';


export function calculateOptionsGroupPrice (optionsGroup, initialValue = 0, filterSelected=true) {
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

export function getProductFinalPrice(product) {
	if (!product) return 0;
	return product?.sale?.progress ? product.sale.price : product.price;
}

export function calculateProductPrice(product, filterSelected=true) {
	const productPrice = getProductFinalPrice(product);
	
	return product.optionsGroups.reduce((totalGroup, group) => {
	
		return calculateOptionsGroupPrice(group, totalGroup, filterSelected);
	}, productPrice);
}

/**
 * Return group new state after select option
 * 
 * @param {*} group 
 * @param {*} optionId 
 */

export function getGroupNewState(optionGroup, optionIndex) {
	const group = cloneDeep(optionGroup);
	
	if (group.type === 'single') {
		const selectedOptionIndex = group.options.findIndex(opt => opt.selected);
		if (selectedOptionIndex > -1 && selectedOptionIndex !== optionIndex) group.options[selectedOptionIndex].selected = false;
	}

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
	let { maxSelect } = group;
	const { minSelect } = group;
	const selectedOptions = group.options.filter(opt=>opt.selected);
	const selectionLength = selectedOptions.length + selectionOffset;

	// Check restraining group max selection
	if (group.restrainedBy && group.restrainedBy.options) {
		const otherOption = group.restrainedBy.options[0];
		maxSelect = otherOption.maxSelectRestrainOther;
	}
	
	// Check the min selection rule
	if (selectionOffset === 0 && minSelect !== 0 && selectionLength < minSelect) {
		throw new Error(`Você deve selecionar no mínimo ${minSelect} ${minSelect > 1 ? 'opções' : 'opção'} em ${group.name}`)
	}

	// Check the max selection rule
	if (maxSelect !== 0 && selectionLength > maxSelect) {
		if (maxSelect === 1) throw new Error(`Você deve selecionar apenas 1 opção em ${group.name}`);
		throw new Error(`Você deve selecionar apenas ${maxSelect} opções em ${group.name}`);
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

export function checkProductRules({ company, product }, force) {
	const { cartItems, cartCompany } = client.readQuery({ query: GET_CART });

	// check is Company is is open
	const isOpen = company.nextClose ? moment(company.nextClose).isSameOrAfter() : false
	if (!isOpen && !company.allowBuyClosed) throw new Error('Esse estabelecimento está fechado no momento');

	// check if there is other company in cart
	if (!force && (cartCompany !== null && cartCompany?.id !== company.id)) throw new CartValidationError('Já existem itens de outro estabelecimento na sua cesta.', 'Quer mesmo limpar sua cesta e adicionar esse item?');

	// check if there is any schedulable product in cart
	const schedulableProducts = CartController.getSchedulableProducts(cartItems);
	if (!force && (!product.scheduleEnabled && schedulableProducts.length
		|| product.scheduleEnabled && cartItems.length > schedulableProducts.length)) {
		throw new CartValidationError('Há produtos sob encomenda na cesta', 'Esse item não pode ser adicionado em uma cesta que já tem itens sob encomenda. Deseja limpar a cesta e adicionar esse item?');
	}

	// check if there is same items in cart

	if (!force && cartItems.find(item => item.productId === product.id && isEqual(item, product))) throw new CartValidationError('Esse item já foi adicionado à cesta', 'Deseja adicionar mais um?');
		
	product.optionsGroups.forEach((group)=>{
		const groupWithRules = getGroupRestrainingRules(product.optionsGroups, group);
		checkGroupRules(groupWithRules);
	});
	return true;
}

export function sanitizeCartData(data) {
	return {
		id: uniqueId(),
		productId: data.id,
		image: data.image,
		name: data.name,
		price: getProductFinalPrice(data),
		quantity: data.quantity,
		message: data.message || '',
		company: {
			...data.company,
			__typename: 'CartCompany'
		},
		__typename: 'CartItem',

		scheduleEnabled: data.scheduleEnabled,
		minDeliveryTime: data.minDeliveryTime,

		optionsGroups: data.optionsGroups.filter(group=>group.options.some(option=>option.selected)).map(group =>{
			return {
				id: uniqueId(),
				name: group.name,
				priceType: group.priceType,
				optionsGroupId: group.id,
				__typename: 'CartOptionsGroup',

				options: group.options.filter(option=>option.selected).map(option => {
					return {
						id: uniqueId(),
						name: option.name,
						description: option.description,
						price: option.price,
						optionId: option.id,
						__typename: 'CartOption',
					};
				})
			}
		})
	}
}
import _ from 'lodash';
import moment from 'moment';

import client from '../services/apolloClient'
import { CartValidationError } from '../utils/errors';
import checkGroupRules from './checkGroupRules';
import getGroupRestrainingRules from './getGroupRestrainingRules';
import getSchedulableProducts from './getSchedulableProducts';

import { GET_CART } from '../graphql/cart';

export default function checkProductRules({ company, product }, force) {
	const { cartItems, cartCompany } = client.readQuery({ query: GET_CART });

	// check if there is other company in cart
	if (!force && (cartCompany !== null && cartCompany?.id !== company.id)) throw new CartValidationError('Já existem itens de outro estabelecimento na sua cesta.', 'Quer mesmo limpar sua cesta e adicionar esse item?');

	// check is Company is is open
	const isOpen = company.nextClose ? moment(company.nextClose).isSameOrAfter() : false;
	const allowBuyClosed = company.allowBuyClosed;
	const scheduledTo = product.scheduleEnabled;

	if (!isOpen) {
		if (!allowBuyClosed) throw new Error('Esse estabelecimento está fechado no momento');
		else {
			if (!scheduledTo && allowBuyClosed === 'onlyScheduled')
				throw new Error('Esse estabelecimento aceita pedidos enquanto está fechado apenas para produtos sob encomenda');
		}
	}

	// check if there is any schedulable product in cart
	if (!force) {
		const schedulableProducts = getSchedulableProducts(cartItems);
		if (!product.scheduleEnabled && schedulableProducts.length)
			throw new CartValidationError('Há produtos sob encomenda na cesta', 'Esse item não pode ser adicionado em uma cesta que já tem itens sob encomenda. Deseja limpar a cesta e adicionar esse item?');

		if (product.scheduleEnabled && cartItems.length > schedulableProducts.length)
			throw new CartValidationError('Esse produto é feito sob encomenda', 'Não há itens sob encomenda em sua cesta. Deseja limpar a cesta e adicionar esse item?');
	}

	// check if there is same items in cart

	if (!force && cartItems.find(item => item.productId === product.id && _.isEqual(item, product))) throw new CartValidationError('Esse item já foi adicionado à cesta', 'Deseja adicionar mais um?');
		
	product.optionsGroups.forEach((group)=>{
		const groupWithRules = getGroupRestrainingRules(product.optionsGroups, group);
		checkGroupRules(groupWithRules);
	});
	return true;
}
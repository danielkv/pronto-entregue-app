import { uniqueId } from 'lodash';

import { CartCompanyError } from '../utils/errors';

import { GET_CART_ITEMS, GET_CART_DELIVERY, GET_CART_PAYMENT, GET_CART, GET_CART_COMPANY } from '../graphql/cart';
import { CALCULATE_DELIVERY_PRICE } from '../graphql/orders';

/* eslint-disable no-underscore-dangle */

export default {
	Query: {
		
	},
	Mutation: {
		// eslint-disable-next-line consistent-return
		cancelCart: (_, args, { cache }) => {
			cache.writeData({
				data: {
					cartMessage: '',
					cartCompany: null,
					cartItems: [],
					cartPrice: 0
				}
			});
		},
		addCartItem: (_, { data, force = false }, { cache }) => {
			const { cartItems, cartCompany } = cache.readQuery({ query: GET_CART });
			
			// check company
			const company = data.company;
			if ((cartCompany !== null && cartCompany?.id !== company.id) && !force) {
				throw new CartCompanyError('CartCompanyError');
			}

			const newCart = force ? [data] : cartItems.concat(data);

			// set cart company
			cache.writeQuery({ query: GET_CART_COMPANY, data: { cartCompany: company } })
			
			// set cart items
			cache.writeQuery({ query: GET_CART_ITEMS, data: { cartItems: newCart } });

			return null;
		},
		removeCartItem: (_, { id }, { cache }) => {
			const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
			
			const removeIndex = cartItems.findIndex(item => item.id === id);
			cartItems.splice(removeIndex, 1);

			cache.writeQuery({ query: GET_CART_ITEMS, data: { cartItems } });

			return null;
		},
		setDelivery: async (_, { data }, { cache, client }) => {
			if (data.type === 'delivery') {
				const { data: deliveryPriceData, error } = await client.query({
					query: CALCULATE_DELIVERY_PRICE,
					variables: { zipcode: parseFloat(data.address.zipcode) }
				});
				
				data.price = deliveryPriceData.calculateDeliveryPrice.price;
				if (error) throw error;
			} else {
				data.price = 0;
				data.address = {
					__typename: 'Address',
					id: uniqueId(),
					name: '',
					street: '',
					number: '',
					district: '',
					city: '',
					state: '',
					zipcode: '',
				};
			}

			data.__typename = 'Delivery';

			cache.writeData({ query: GET_CART_DELIVERY, data: { cartDelivery: data } });

			return null;
		},
		setPayment: (_, { data }, { cache }) => {
			data.__typename = 'Payment';
			data.price = 0;

			cache.writeData({ query: GET_CART_PAYMENT, data: { cartPayment: data } });

			return null;
		},
		
	}
}
import { uniqueId } from 'lodash';

import { GET_CART_ITEMS, GET_CART_DELIVERY, GET_CART_PAYMENT } from '../graphql/cart';
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
					/* cartDelivery: null,
					cartPayment: null, */
					cartMessage: '',
					cartItems: []
				}
			});
		},
		addCartItem: (_, { data }, { cache }) => {
			const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
			
			const new_cart = cartItems.concat(data);

			cache.writeQuery({ query: GET_CART_ITEMS, data: { cartItems: new_cart } });

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
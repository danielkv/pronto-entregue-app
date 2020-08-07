import { uniqueId } from 'lodash';

import * as CartController from '../controller/cart';
import { extractFirstError } from '../utils/errors';

import { SET_SELECTED_ADDRESS } from '../graphql/addresses';
import { GET_CART_ITEMS, GET_CART_DELIVERY, GET_CART_PAYMENT, GET_CART, GET_CART_COMPANY, CHECK_DELIVERY_LOCATION, GET_CART_COUPON } from '../graphql/cart';

/* eslint-disable no-underscore-dangle */

export default {
	Query: {
		
	},
	Mutation: {
		// eslint-disable-next-line consistent-return
		cancelCart: (_, __, { cache }) => {
			cache.writeData({
				data: {
					cartMessage: '',
					cartCompany: null,
					cartDelivery: null,
					cartPayment: null,
					cartItems: [],
					cartSubtotal: 0,
					cartPrice: 0,
					cartCoupon: null,
					cartScheduled: null
				}
			});
		},
		addCartItem: (_, { data }, { cache }) => {
			// get cart
			const { cartItems, cartCompany } = cache.readQuery({ query: GET_CART });
			let newCart;
			
			const schedulableProducts = CartController.getSchedulableProducts(cartItems);

			// check company
			const company = data.company;

			// if company is different, forces reset cart
			if ((cartCompany !== null && cartCompany?.id !== company.id)
				|| (!data.scheduleEnabled && schedulableProducts.length
					|| data.scheduleEnabled && cartItems.length > schedulableProducts.length)) {
				newCart =  [data];
			} else {
				newCart = cartItems.concat(data);
			}

			// set cart company
			cache.writeQuery({ query: GET_CART_COMPANY, data: { cartCompany: company } });
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
		setDelivery: async (_, { type, address, force=false }, { cache, client }) => {
			try {
				const delivery = { type };
			
				if (type === 'delivery') {
					delete address.__typename;
					await client.mutate({ mutation: SET_SELECTED_ADDRESS, variables: { address, force } });
				
					const { cartCompany } = cache.readQuery({ query: GET_CART_COMPANY });

					if (!cartCompany) throw new Error('Nenhum item no carrinho');
				
					delete address.__typename;
					const { data: { checkDeliveryLocation }, error } = await client.mutate({
						mutation: CHECK_DELIVERY_LOCATION,
						variables: { companyId: cartCompany.id, location: address.location }
					})
				
					delivery.price = checkDeliveryLocation.price;
					if (error) throw error;
				} else {
					delivery.price = 0;
				}

				delivery.__typename = 'Delivery';
				delivery.id = uniqueId();

				cache.writeQuery({ query: GET_CART_DELIVERY, data: { cartDelivery: delivery } });

			} catch(err) {
				throw new Error(JSON.stringify(extractFirstError(err)));
			}
		},
		setPayment: (_, { data }, { cache }) => {
			data.__typename = 'Payment';
			cache.writeQuery({ query: GET_CART_PAYMENT, data: { cartPayment: data } });

			return null;
		},
		setCoupon: (_, { data }, { cache }) => {
			data.__typename = 'Coupon';
			cache.writeQuery({ query: GET_CART_COUPON, data: { cartCoupon: data } });

			return null;
		},
		
	}
}
import { AsyncStorage } from "react-native";

import { cloneDeep } from 'lodash';

import { sanitizeAddress } from "../controller/address";
import { extractFirstError } from "../utils/errors";

import { GET_SELECTED_ADDRESS, SET_USER_ADDRESS } from "../graphql/addresses";
import { LOGGED_USER_ID } from "../graphql/authentication";
import { GET_CART, CHECK_DELIVERY_LOCATION, CANCEL_CART } from "../graphql/cart";

export default {
	Query: {
	},
	Mutation: {
		async setSelectedAddress (_, { address, force = false }, { cache, client }) {
			try {
				const newAddress = sanitizeAddress(cloneDeep(address));
				const { loggedUserId } = cache.readQuery({ query: LOGGED_USER_ID });
				const cart = cache.readQuery({ query: GET_CART });

				if (cart?.cartItems?.length && (cart?.cartDelivery && cart?.cartDelivery?.type === 'delivery') && cart.cartCompany) {
					if (!force) {
						// Check if delivery location is OK
						await client.mutate({ mutation: CHECK_DELIVERY_LOCATION, variables: { companyId: cart.cartCompany.id, address: newAddress } })
					} else {
						// check cart
						await client.mutate({ mutation: CANCEL_CART });
					}
				}

				// fix address id for legacy versions
				if (newAddress.id === 'temp') delete newAddress.id;

				// if addres has no ID or ID is 'temp', create new addres on DB
				const { data: { setUserAddress } } = await client.mutate({ mutation: SET_USER_ADDRESS, variables: { addressData: newAddress, userId: loggedUserId } });

				await AsyncStorage.setItem('@prontoEntregue/address', JSON.stringify(setUserAddress));
				
				cache.writeQuery({ query: GET_SELECTED_ADDRESS, data: { selectedAddress: setUserAddress } });
			} catch(err) {
				const error = extractFirstError(err);
				throw new Error(JSON.stringify(error))
			}
		}
	}
}
import { AsyncStorage } from "react-native";

import { cloneDeep } from 'lodash';

import { sanitizeAddress } from "../controller/address";
import { extractFirstError } from "../utils/errors";

import { GET_SELECTED_ADDRESS } from "../graphql/addresses";
import { GET_CART, CHECK_DELIVERY_LOCATION, CANCEL_CART } from "../graphql/cart";

export default {
	Query: {
	},
	Mutation: {
		async setSelectedAddress (_, { address, force = false }, { cache, client }) {
			try {
				const newAddress = sanitizeAddress(cloneDeep(address));
				const cart = cache.readQuery({ query: GET_CART });

				if (cart?.cartItems?.length && (cart?.cartDelivery && cart?.cartDelivery?.type === 'delivery') && cart.cartCompany) {
					if (!force) {
						// Check if delivery location is OK
						await client.mutate({ mutation: CHECK_DELIVERY_LOCATION, variables: { companyId: cart.cartCompany.id, location: newAddress.location } })
					} else {
						// check cart
						await client.mutate({ mutation: CANCEL_CART });
					}
				}

				// fix address id for legacy versions
				if (!newAddress.id) newAddress.id = 'temp';
				newAddress.__typename = 'Address';

				await AsyncStorage.setItem('@prontoEntregue/address', JSON.stringify(newAddress));
				
				cache.writeQuery({ query: GET_SELECTED_ADDRESS, data: { selectedAddress: newAddress } });
			} catch(err) {
				const error = extractFirstError(err);
				throw new Error(JSON.stringify(error))
			}
		}
	}
}
import { AsyncStorage } from "react-native";

import { GET_SELECTED_ADDRESS } from "../graphql/addresses";

export default {
	Query: {
	},
	Mutation: {
		async setSelectedAddress (_, { address }, { cache }) {
			address.__typename = 'Address';
			delete address.id;
			await AsyncStorage.setItem('@prontoEntregue/address', JSON.stringify(address));
			cache.writeQuery({ query: GET_SELECTED_ADDRESS, data: { selectedAddress: address } });
		}
	}
}
import { AsyncStorage } from "react-native";

import client from "../../services/apolloClient";
import isValidAddress from "./isValidAddress";

import { GET_USER_LAST_ORDER_ADDRESS } from "../../graphql/users";

export default async function getUserLastOrderAddress(user) {
	// check if has address saved
	const savedAddress = await AsyncStorage.getItem('@prontoEntregue/address');
	if (savedAddress && isValidAddress(savedAddress)) return savedAddress;
	
	const { data: { getLastOrderAddress: lastOrderAddress = null } } = await client.query({ query: GET_USER_LAST_ORDER_ADDRESS, variables: { userId: user.id } });
	return lastOrderAddress;
}
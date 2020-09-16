import { AsyncStorage } from "react-native";

import client from "../../services/apolloClient";
import getLocalSavedAddress from "./getLocalSavedAddress";

import { GET_USER_LAST_ORDER_ADDRESS } from "../../graphql/users";

export default async function getUserLastOrderAddress(user) {
	// check if has address saved
	const savedAddress = await getLocalSavedAddress();
	if (savedAddress) return savedAddress;

	// load last address
	const { data: { getLastOrderAddress: lastOrderAddress = null } } = await client.query({ query: GET_USER_LAST_ORDER_ADDRESS, variables: { userId: user.id } });

	return lastOrderAddress;
}
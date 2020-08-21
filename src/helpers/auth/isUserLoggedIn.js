import { AsyncStorage } from "react-native";

import client from "../../services/apolloClient";

import { AUTHENTICATE } from "../../graphql/authentication";

export default async function isUserLoggedIn() {
	// check if app has token saved
	const userToken = await AsyncStorage.getItem('@prontoEntregue/userToken');
	if (!userToken) return;

	// authenticate token
	const { data } = await client.mutate({ mutation: AUTHENTICATE, variables: { token: userToken } });
	return { user: data.authenticate, token: userToken };
}
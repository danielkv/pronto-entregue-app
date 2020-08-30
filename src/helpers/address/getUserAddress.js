import client from "../../services/apolloClient";

import { GET_USER_ADDRESSES } from "../../graphql/users";

export default async function getUserAddress(user) {
	const { data: { user: { addresses = [] } = {} } = {} } = client.query({ query: GET_USER_ADDRESSES, variables: { id: user.id } });
	return addresses;
}
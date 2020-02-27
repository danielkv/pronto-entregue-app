import { useQuery } from "@apollo/react-hooks";

import { GET_SELECTED_ADDRESS } from "../graphql/addresses";
import { LOGGED_USER_ID } from "../graphql/authentication";

export function useLoggedUserId() {
	const { data: { loggedUserId = null } = {} } = useQuery(LOGGED_USER_ID);

	return loggedUserId;
}

export function useSelectedAddress() {
	const { data: { selectedAddress = null } = {} } = useQuery(GET_SELECTED_ADDRESS);

	return selectedAddress;
}
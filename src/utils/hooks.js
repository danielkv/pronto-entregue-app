import { useQuery } from "@apollo/react-hooks";

import { LOGGED_USER_ID } from "../graphql/authentication";

export function useLoggedUserId() {
	const { data: { loggedUserId = null } = {} } = useQuery(LOGGED_USER_ID);

	return loggedUserId;
}
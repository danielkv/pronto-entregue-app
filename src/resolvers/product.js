import { LOGGED_USER_ID } from "../graphql/authentication"
import { GET_USER_FAVORITE_PRODUCTS } from "../graphql/users"

export default {
	Product: {
		async favorite(parent, { id }, { client }) {
			//get logged user id
			const { loggedUserId } = client.readQuery({ query: LOGGED_USER_ID });

			// load favorite products
			const { data: { user: { favoriteProducts = [] } = {} } = {} } = await client.query({ query: GET_USER_FAVORITE_PRODUCTS, variables: { id: loggedUserId }, fetchPolicy: 'no-cache' })

			return Boolean(favoriteProducts.find(row => row.id === id));
		}
	}
}
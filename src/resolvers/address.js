import { GET_SELECTED_ADDRESS } from "../graphql/addresses";

export default {
	Query: {
	},
	Mutation: {
		setSelectedAddress (_, { address }, { cache }) {
			cache.writeQuery({ query: GET_SELECTED_ADDRESS, data: { selectedAddress: address } })
		}
	}
}
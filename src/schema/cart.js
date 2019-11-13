import gql from 'graphql-tag';

export const schema = gql`
	type CartItem {
		id: ID!
		product_id: ID!
		name: String!
		message: String!
		image: String!
		price: Float!
		options_groups: [CartOptionsGroup]!
	}
	type CartOptionsGroup {
		id: ID!
		name: String!
		options_group_id: ID!
		options: [CartOption]!
	}
	type CartOption {
		id: ID!
		name: String!
		option_id: ID!
		price: Float!
	}

	input CartItemInput {
		id: ID!
		product_id: Int!
		name: String!
		image: String!
		message: String!
		price: Float!
		options_groups: [CartOptionsGroupInput]!
	}
	input CartOptionsGroupInput {
		id: ID!
		name: String!
		options_group_id: ID!
		options: [CartOptionInput]!
	}
	input CartOptionInput {
		id: ID!
		name: String!
		price: Float!
		option_id: ID!
	}
	#type Cart {
	#	delivery: ID
	#	payment: ID
	#	items: [CartItem]!
	#}
	extend type Query {
		cartItems: [CartItem]!
	}
	#extend type Mutation {
	#	addCartItem(data: CartItemInput!): CartItem!
	#}
`;
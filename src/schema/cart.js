import gql from 'graphql-tag';

export const schema = gql`
	type CartItem {
		id: ID!
		product_id: ID!
		name: String!
		quantity: Int!
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
		quantity: Int!
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

	extend type Product {
		favorite(id: ID!): Boolean!
	}

	#input DeliveryInput {
	#	type: String!
	#	price: Float!
	#	address: Address
	#}

	#type Delivery {
	#	type: String!
	#	price: Float!
	#	address: Address
	#}

	extend type Query {
		cartItems: [CartItem]!,
		cartDelivery: Delivery
	}
`;
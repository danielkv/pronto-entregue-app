import gql from 'graphql-tag';

export const ADD_CART_ITEM = gql`
	mutation ($data: CartItemInput!) {
		addCartItem (data: $data) @client
	}
`;
export const GET_CART_DELIVERY = gql`
	query {
		cartDelivery @client
	}
`;
export const GET_CART_PAYMENT = gql`
	query {
		cartPayment @client
	}
`;

export const GET_CART_ITEMS = gql`
	query {
		cartItems @client {
			id
			product_id
			name
			message
			image
			price
			options_groups {
				id
				name
				options {
					id
					name
					price
				}
			}
		}
	}
`;
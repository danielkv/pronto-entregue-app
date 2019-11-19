import gql from 'graphql-tag';

export const ADD_CART_ITEM = gql`
	mutation AddCartItem ($data: CartItemInput!) {
		addCartItem (data: $data) @client
	}
`;
export const REMOVE_CART_ITEM = gql`
	mutation RemoveCartItem ($id: ID!) {
		removeCartItem (id: $id) @client
	}
`;
export const CANCEL_CART = gql`
	mutation CancelCart {
		cancelCart @client
	}
`;
export const SET_CART_DELIVERY = gql`
	mutation SetCartDelivery ($data: DeliveryInput!) {
		setDelivery (data: $data) @client
	}
`;
export const SET_CART_PAYMENT = gql`
	mutation SetCartPayment ($data: PaymentInput!) {
		setPayment (data: $data) @client
	}
`;
export const GET_CART = gql`
	query GetCart {
		cartDelivery @client {
			type
			price
			address {
				name,
				street
				number
				district
				city
				state
				zipcode
			}
		}

		cartPrice @client

		cartDiscount @client

		cartMessage @client

		cartPayment @client {
			id
			name
			display_name
			price
		}

		cartItems @client {
			id
			product_id
			name
			message
			image
			price
			quantity
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
export const GET_CART_DELIVERY = gql`
	query GetCartDeliveryType {
		cartDelivery @client {
			type
			price
			address {
				name,
				street
				number
				district
				city
				state
				zipcode
			}
		}
	}
`;

export const GET_CART_PAYMENT = gql`
	query GetCartPaymentMethod {
		cartPayment @client {
			id
			name
			display_name
			price
		}
	}
`;

export const GET_CART_ITEMS = gql`
	query GetCartItems {
		cartItems @client {
			id
			product_id
			name
			message
			image
			price
			quantity
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
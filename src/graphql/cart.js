import gql from 'graphql-tag';

export const ADD_CART_ITEM = gql`
	mutation AddCartItem ($data: CartItemInput!, $force: Boolean) {
		addCartItem (data: $data, force: $force) @client
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
	mutation SetCartDelivery ($type: String!, $address: AddressInput!, $force: Boolean) {
		setDelivery(type: $type, address: $address, force: $force) @client
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
			id
			type
			price
		}

		cartCompany @client {
			id
			displayName
			image
		}

		cartPrice @client

		cartDiscount @client

		cartMessage @client

		cartPayment @client {
			id
			image
			type
			displayName
		}

		cartItems @client {
			id
			productId
			name
			message
			image
			price
			quantity
			optionsGroups {
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
			id
			type
			price
		}
	}
`;

export const GET_CART_COMPANY = gql`
	query GetCartCompany {
		cartCompany @client {
			id
			displayName
			image
		}
	}
`;

export const GET_CART_PAYMENT = gql`
	query GetCartPaymentMethod {
		cartPayment @client {
			id
			image
			type
			displayName
		}
	}
`;

export const GET_CART_ITEMS = gql`
	query GetCartItems {
		cartItems @client {
			id
			productId
			name
			message
			image
			price
			quantity
			optionsGroups {
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

export const CHECK_DELIVERY_LOCATION = gql`
	mutation CheckDeliveryLocation ($companyId: ID!, $address: AddressInput!) {
		checkDeliveryLocation(companyId: $companyId, address: $address) {
			id
			distance
			price
		}
	}
`;

export const CHECK_ORDER_PRODUCTS = gql`
	mutation CheckOrderProducts ($order: OrderInput!) {
		checkOrderProducts(order: $order)
	}
`;

export const CHECK_ORDER = gql`
	mutation CheckOrder ($order: OrderInput!) {
		checkOrderAddress(order: $order)
		checkOrderProducts(order: $order)
	}
`;
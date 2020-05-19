import gql from 'graphql-tag';

import { OPTIONS_GROUP_FRAGMENT } from './products';

export const ORDER_PRODUCT_RELATED_FRAGMENT = gql`
	fragment ProductRelatedFields on Product {
		id
		name
		#quantity
		price
		description
		image
		optionsGroups(filter: $filter) {
			...OptionsGroupFields
		}
	}
	${OPTIONS_GROUP_FRAGMENT}
`;

export const ORDER_FRAGMENT = gql`
	fragment OrderFields on Order {
		id
		price
		type
		message
		deliveryPrice
		deliveryTime
		discount
		paymentFee
		paymentMethod {
			id
			displayName
			type
		}

		address {
			street
			number
		}

		company {
			id
			displayName
			deliveryTime
			isOpen
			backgroundColor
			image
			rate
			address {
				street
				number
				city
				state
				zipcode
				location
			}
		}
		
		products {
			id
			name
			price
			image
			quantity
			message
			optionsGroups {
				id
				name
				priceType
				options {
					id
					name
					price
				}
			}
		}
		status
		createdAt
	}
	
`;

export const CREATE_ORDER = gql`
	mutation ($data: OrderInput!) {
		createOrder(data: $data) {
			...OrderFields
		}
	}
	${ORDER_FRAGMENT}
`;

export const UPDATE_ORDER = gql`
	mutation updateOrder ($id:ID!, $data:OrderInput!) {
		updateOrder(id:$id, data:$data) {
			id
			status
		}
	}
`;

export const CANCEL_ORDER = gql`
	mutation cancelOrder ($id: ID!) {
		cancelOrder(id: $id) {
			id
			status
		}
	}
`;

export const LOAD_ORDER = gql`
	query loadOrder ($id:ID!) {
		order (id:$id) {
			...OrderFields
		}
	}
	${ORDER_FRAGMENT}
`;

export const GET_USER_ORDERS = gql`
	query GetUserOrders($id: ID!, $pagination: Pagination) {
		user (id: $id) {
			id
			countOrders
			orders(pagination: $pagination) {
				id
				price
				countProducts
				deliveryTime
				status
				createdAt
				company {
					id
					displayName
					isOpen
					image
				}
			}
		}
		pageInfo {
			page
		}
	}
`;


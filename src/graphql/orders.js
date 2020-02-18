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
		options_groups(filter:$filter) {
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
		delivery_price
		discount
		payment_fee
		payment_method {
			id
			display_name
		}

		street
		number
		
		products {
			id
			name
			price
			quantity
			message
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
		status
		createdDate
		createdTime
	}
	
`;

export const CALCULATE_DELIVERY_PRICE = gql`
	query ($zipcode:Int!) {
		calculateDeliveryPrice(zipcode: $zipcode) {
			id
			name
			price
		}
	}
`;

export const CREATE_ORDER = gql`
	mutation ($data:OrderInput!) {
		createOrder(data:$data) {
			id
			price
		}
	}
`;

export const UPDATE_ORDER = gql`
	mutation updateOrder ($id:ID!, $data:OrderInput!) {
		updateOrder(id:$id, data:$data) {
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
	query ($id: ID!) {
		user (id: $id) {
			id
			orders {
				id
				type
				user {
					id
					fullName
				}
				street
				number
				price
				products_qty
				status
				createdDate
				createdTime
			}
		}
	}
`;
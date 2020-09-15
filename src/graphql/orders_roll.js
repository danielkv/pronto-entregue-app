import gql from 'graphql-tag';


export const ORDER_CREATED_PRODUCT = gql`
	fragment OrderCreatedProduct on OrderProduct {
		id
		name
		image
		price
		message
		quantity
		
		productRelated {
			id
			sku
			description
		}
		
		optionsGroups {
			id
			name
			options {
				id
				name
				description
				price
			}
		}
	}	
`;

export const ORDER_CRATED_FRAGMENT = gql`
	fragment OrderCratedFragment on Order {
		id
		type
		deliveryPrice
		scheduledTo
		price
		discount
		status
		message
		createdAt
		user {
			id
			fullName
			firstName
			lastName
			image
			email
			phones: metas(type: "phone") {
				value
			}
		}
		products {
			...OrderCreatedProduct
		}
		paymentMethod {
			id
			type
			image
			displayName
		}
		creditHistory {
			id
			history
			value
		}
		address {
			id
			name
			street
			number
			reference
			complement
			zipcode
			district
			city
			state
			location
		}
		delivery {
			id
			status
			deliveryMan {
				user {
					fullName
					phones: metas(type: "phone") {
						value
					}
				}
			}
		}
	}
	${ORDER_CREATED_PRODUCT}
`;

export const GET_ORDER_ROLL = gql`
	query GetOrderRoll ($companyId: ID!, $filter: JSON) {
		company (id: $companyId) {
			id
			orders (filter: $filter) {
				...OrderCratedFragment
			}
		}
	}
	${ORDER_CRATED_FRAGMENT}
`;

export const SUBSCRIBE_ORDER_CREATED = gql`
	subscription ($companyId: ID!) {
		orderCreated(companyId: $companyId) {
			...OrderCratedFragment
		}
	}

	${ORDER_CRATED_FRAGMENT}
`;

export const ORDER_STATUS_UPDATED = gql`
	subscription ($companyId: ID!) {
		updateOrderStatus(companyId: $companyId) {
			...OrderCratedFragment
		}
	}

	${ORDER_CRATED_FRAGMENT}
`;
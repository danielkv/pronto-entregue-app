import gql from 'graphql-tag';

import { LIST_PRODUCT_FRAGMENT, COMPANY_DELIVERY_FRAGMENT, COMPANY_PICKUP_FRAGMENT, COMPANY_MIN_FRAGMENT } from './fragments';

export const LOAD_COMPANY = gql`
	query LoadCompany ($id: ID!, $location: GeoPoint!) {
		company (id: $id, location: $location) {
			id
			displayName
			deliveryTime
			rate
			isOpen
			countRatings
			distance
			delivery {
				...CompanyDeliveryFields
			}
			pickup {
				...CompanyPickupFields
			}
		}
	}
	${COMPANY_DELIVERY_FRAGMENT}
	${COMPANY_PICKUP_FRAGMENT}
`;

export const GET_CATEGORIES = gql`
	query GetCompanyCategories ($filter: JSON) {
		categories: loadCompanyCategories (filter: $filter) {
			id
			name
			products {
				...ListProductFragment
				company {
					...CompanyMinFields
				}
			}
		}
	}

	${COMPANY_MIN_FRAGMENT}
	${LIST_PRODUCT_FRAGMENT}
 `;

export const GET_RATINGS = gql`
	query LoadRatings ($filter: Filter, $pagination: Pagination) {
		ratings (filter: $filter, pagination: $pagination) {
			id
			rate
			comment
			createdAt
			user {
				id
				fullName
				image
			}

		}
		countRatings(filter: $filter)
		pageInfo {
			page
		}
	}
 `;

export const GET_COMPANIES = gql`
	query GetCompanies($pagination: Pagination, $location: GeoPoint!, $filter: JSON) {
		companies(location: $location, pagination: $pagination, filter: $filter) {
			id
			displayName
			isOpen
			backgroundColor
			image
			rate
			deliveryTime
			distance
			delivery {
				id
				price
			}
			pickup {
				id
			}
		}
	}
`;

export const SUGGEST_COMPANY = gql`
	mutation ($data: JSON) {
		suggestCompany(data: $data)
	}
`;

export const GET_COMPANY = gql`
	query GetCompany ($id: ID!) {
		company (id: $id) {
			...CompanyMinFields
		}
	}
	${COMPANY_MIN_FRAGMENT}
`;

export const GET_COMPANY_PAYMENT_METHODS = gql`
	query GetPaymentPaymentMethods ($id: ID!) {
		company (id: $id) {
			id
			isOpen
			appMethods: paymentMethods(filter: { type: "app" }) {
				id
				type
				image
				displayName
			}
			moneyMethods: paymentMethods(filter: { type: "money" }) {
				id
				type
				image
				displayName
			}
			deliveryMethods: paymentMethods(filter: { type: "delivery" }) {
				id
				type
				image
				displayName
			}
		}
	}
 `;
import gql from 'graphql-tag';

import { LIST_PRODUCT_FRAGMENT } from './products';

/**
 * Atualiza infomações da empresa no servidor
 * 
 */
export const UPDATE_COMPANY = gql`
	mutation ($id: ID!, $data:CompanyInput!) {
		updateCompany (id: $id, data:$data) {
			id
			name
			display_name
			createdAt
			active
			metas {
				id
				key
				value
			}
		}
	}
`;

export const LOAD_COMPANY = gql`
	query LoadCompany ($id: ID!, $location: GeoPoint!) {
		company (id: $id) {
			id
			displayName
			rate
			deliveryTime
			countRatings
			distance(location: $location)
		}
	}
`;

export const GET_CATEGORIES = gql`
	query GetCompanyCategories ($filter: Filter) {
		categories (filter: $filter) {
			id
			name
			products {
				...ListProductFragment
			}
		}
	}

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

export const GET_COMPANY_PAYMENT_METHODS = gql`
	query GetPaymentPaymentMethods ($id: ID!) {
		company (id:$id) {
			id
			paymentMethods {
				id
				type
				image
				displayName
			}
		}
	}
 `;

export const GET_USER_COMPANIES = gql`
	query {
		userCompanies {
			id
			name
			display_name
			createdAt
			last_month_revenue
			active
		}
	}
`;



/**
 * Retorna empresa selecionada
 */

export const GET_SELECTED_COMPANY = gql`
	{
		selectedCompany
	}
`;
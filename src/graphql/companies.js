import gql from 'graphql-tag';

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
				meta_type
				meta_value
			}
		}
	}
`;

export const GET_COMPANY_PAYMENT_METHODS = gql`
	query GetPaymentPaymentMethods ($id:ID!) {
		branch (id:$id) {
			id
			paymentMethods {
				id
				name
				display_name
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
import gql from 'graphql-tag';

export const GET_USER_ADDRESSES = gql`
	query getUserAddresses {
		me  {
			id
			addresses {
				id
				name
				street
				number
				zipcode
				district
				city
				state
			}
		}
	}
`;

export const GET_USER = gql`
	query getUser {
		me  {
			id
			full_name
			email
		}
	}
`;

export const CREATE_USER_ADDRESS = gql`
	mutation createUserAddress ($data: UserAddressInput!) {
		createUserAddress (data: $data)  {
			id
			name
		}
	}
`;
export const UPDATE_USER_ADDRESS = gql`
	mutation updateUserAddress ($id: ID!, $data: UserAddressInput!) {
		updateUserAddress (id: $id, data: $data)  {
			id
			name
			street
			number
			zipcode
			district
			city
			state
		}
	}
`;
export const REMOVE_USER_ADDRESS = gql`
	mutation removeUserAddress ($id: ID!) {
		removeUserAddress (id: $id)  {
			id
			name
		}
	}
`;

/**
 * Carrega todas infomações ao acessar
 * 
 * companies, branches, 
 */
export const LOAD_INITIAL_DATA = gql`
	query init {
		me {
			id
			companies {
				id
				name
				display_name
				last_month_revenue
				createdAt
				active
			}
		}
	}
`;

export const CREATE_USER = gql`
	mutation ($data:UserInput!) {
		createUser (data:$data) {
			id
			full_name
			role
			createdAt
			active
		}
	}
`;

export const GET_COMPANY_USERS = gql`
	query ($id:ID!) {
		company (id:$id) {
			id
			users {
				id
				full_name
				role
				createdAt
				active
			}
		}
	}
`;

export const UPDATE_USER = gql`
	mutation ($id:ID!, $data:UserInput!) {
		updateUser (id: $id, data:$data) {
			id
			first_name
			last_name
			email
			createdAt
			active
			role
			company(company_id:$company_id) {
				id
				user_relation {
					active
				}
				assigned_branches {
					id
					name
					user_relation {
						active
						role_id
					}
				}
			}
			metas {
				id
				meta_type
				meta_value
				action @client
			}
		}
	}
`;
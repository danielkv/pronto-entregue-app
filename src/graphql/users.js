import gql from 'graphql-tag';

export const GET_USER_ADDRESSES = gql`
	query getUserAddresses ($id: ID!) {
		user (id: $id)  {
			id
			addresses {
				id
				name
				street
				number
				complement
				zipcode
				district
				city
				state
			}
		}
	}
`;

export const GET_USER = gql`
	query getUser ($id: ID!) {
		user (id: $id)  {
			id
			full_name
			first_name
			last_name
			email
			role
			metas (type: "phone") {
				id
				meta_type
				meta_value
			}
		}
	}
`;

export const LOAD_USER_ADDRESS = gql`
	query loadUserAddress ($id: ID!) {
		userAddress (id: $id)  {
			id
			name
			street
			number
			complement
			zipcode
			district
			city
			state
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

export const CREATE_USER = gql`
	mutation ($data:UserInput!) {
		createUser (data:$data) {
			id
			full_name
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
			full_name
			first_name
			last_name
			email
			metas {
				id
				meta_type
				meta_value
			}
		}
	}
`;
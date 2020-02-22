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
				location
			}
		}
	}
`;

export const GET_USER = gql`
	query getUser ($id: ID!) {
		user (id: $id)  {
			id
			fullName
			firstName
			lastName
			email
			role
			metas (type: "phone") {
				id
				key
				value
			}
		}
	}
`;

export const GET_SELECTED_USER_ADDRESS = gql`
	query selectedAddress {
		selectedAddress @client
	}
`;

export const GET_USER_ADDRESS = gql`
	query loadUserAddress ($id: ID!) {
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
				location
			}
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
			fullName
		}
	}
`;

export const GET_COMPANY_USERS = gql`
	query ($id:ID!) {
		company (id:$id) {
			id
			users {
				id
				fullName
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
			fullName
			firstName
			lastName
			email
			metas {
				id
				key
				value
			}
		}
	}
`;
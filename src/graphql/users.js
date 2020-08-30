import gql from 'graphql-tag';

import { LIST_PRODUCT_FRAGMENT, ADDRESS_FRAGMENT } from './fragments';


export const GET_USER_ADDRESSES = gql`
	query getUserAddresses ($id: ID!) {
		user (id: $id)  {
			id
			addresses {
				...AddressFields
			}
		}
	}

	${ADDRESS_FRAGMENT}
`;

export const GET_USER_LAST_ORDER_ADDRESS = gql`
	query GetLastOrderAddress ($userId: ID!) {
		getLastOrderAddress (userId: $userId)  {
			...AddressFields
		}
	}

	${ADDRESS_FRAGMENT}
`;

export const GET_USER_FAVORITE_PRODUCTS = gql`
	query GetUserFavoriteProducts ($id: ID!) {
		user (id: $id)  {
			id
			favoriteProducts {
				...ListProductFragment
				
			}
		}
	}
	${LIST_PRODUCT_FRAGMENT}
`;

export const GET_USER_CREDITS = gql`
	query GetCredits ($id: ID!) {
		user (id: $id)  {
			id
			creditBalance
			creditHistory {
				id
				value
				createdAt
				history
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
			image
			email
			role
			phones: metas (type: "phone") {
				id
				key
				value
			}
			cpf: metas (type: "document") {
				id
				key
				value
			}
		}
	}
`;

export const GET_USER_COMPANIES = gql`
	query getUserCompanies ($id: ID!) {
		user (id: $id)  {
			id
			companies {
				id
				displayName
			}
		}
	}
`;

export const PUSH_NOTIFICATION_TOKEN = gql`
	mutation PushNotificationToken($userId: ID!, $token: String!) {
		pushNotificationToken(userId: $userId, token: $token)
	}
`;

export const REMOVE_NOTIFICATION_TOKEN = gql`
	mutation RemoveNotificationToken($token: String!) {
		removeNotificationToken(token: $token)
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
	mutation CreateUserAddress ($data: AddressInput!) {
		createUserAddress(data: $data) {
			id
			name
			street
			number
			district
			city
			state
			zipcode
			location
		}
	}
`;

export const CREATE_USER = gql`
	mutation ($data: UserInput!) {
		createUser (data: $data) {
			id
			fullName
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser($id: ID!, $data: UserInput!) {
		updateUser (id: $id, data:$data) {
			id
			fullName
			firstName
			lastName
			email
			phones: metas (type: "phone") {
				id
				key
				value
			}
			cpf: metas (type: "document") {
				id
				key
				value
			}
		}
	}
`;

export const UPDATE_USER_IMAGE = gql`
	mutation UpdateUserImage($userId: ID!, $image: Upload!) {
		updateUserImage (userId: $userId, image: $image) {
			id
			image
		}
	}
`;

export const GET_SELECTED_COMPANY = gql`
	query {
		selectedCompany @client
	}
`;
export const SET_SELECTED_COMPANY = gql`
	mutation ($companyId: ID!) {
		setSelectedCompany (companyId: $companyId) @client
	}
`;
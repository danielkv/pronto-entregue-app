import gql from 'graphql-tag';

import { LIST_PRODUCT_FRAGMENT } from './products';

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
			metas (type: "phone") {
				id
				key
				value
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
	mutation PushNotificationToken($token: String!) {
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
			metas (type: "phone") {
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
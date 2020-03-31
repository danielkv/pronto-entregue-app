import gql from 'graphql-tag';

/**
 * Recupera o Token do usuário salvo em cache 
 */
export const AUTHENTICATE = gql`
	mutation ($token: String!) {
		authenticate (token: $token) {
			id
			fullName
			email
		}
	}
`;

/**
 * Recupera o Token do usuário salvo em cache 
 */
export const GET_USER_TOKEN = gql`
	{
		userToken
	}
`;


/**
 * Recupera o Token do usuário salvo em cache 
 */
export const LOGGED_USER_ID = gql`
	query LoggedUserId {
		loggedUserId @client
	}
`;

/**
 * Recupera o Token do usuário salvo em cache 
 */
/* export const IS_USER_LOGGED_IN = gql`
	query isUserLoggedIn {
		isUserLoggedIn
	}
`; */

/**
 * GRAPHQL para fazer o login do usuário
 */

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			user {
				id
				fullName
				firstName
				lastName
				socialLogin
				email
				role
				active
			}
			token
		}
	}
`;

export const SOCIAL_LOGIN = gql`
	mutation SocialLogin($type: String!, $data: SocialUser!) {
		socialLogin (type: $type, data: $data) {
			user {
				id
				fullName
				firstName
				lastName
				socialLogin
				email
				role
				active
			}
			token
		}
	}
`;
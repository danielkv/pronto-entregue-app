import gql from 'graphql-tag';

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
export const IS_USER_LOGGED_IN = gql`
	query isUserLoggedIn {
		isUserLoggedIn
	}
`;

/**
 * GRAPHQL para fazer o login do usuário
 */

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			user {
				id
				full_name
				first_name
				last_name
				email
				role
				active
			}
			token
		}
	}
`;

/**
 * GRAPHQL para autenticação do usuário
 */

export const LOGGED_USER = gql`
	query LoggedUser {
		me {
			id
			full_name
			first_name
			last_name
			email
			role
		}
	}
`;
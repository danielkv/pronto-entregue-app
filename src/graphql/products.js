import gql from 'graphql-tag';

import {
	OPTIONS_GROUP_FRAGMENT,
	LIST_PRODUCT_FRAGMENT,
	COMPANY_LOCATION_FRAGMENT,
	COMPANY_MIN_FRAGMENT
} from './fragments';

export const LOAD_FEED = gql`
	query LOAD_FEED ($onSaleLimit: Int!, $bestSellersLimit: Int!, $location: GeoPoint!, $pagination: Pagination) {
		productsOnSale(limit: $onSaleLimit, location: $location) {
			...ListProductFragment
			company {
				...CompanyMinFields
			}
		}

		bestSellers (limit: $bestSellersLimit, location: $location) {
			...ListProductFragment
			company {
				...CompanyMinFields
			}
		}

		companies(location: $location, pagination: $pagination) {
			...CompanyLocationFields
		}
	}

	${COMPANY_MIN_FRAGMENT}
	${COMPANY_LOCATION_FRAGMENT}
	${LIST_PRODUCT_FRAGMENT}	
`;

export const ADD_FAVORITE_PRODUCT = gql`
	mutation AddFavoriteProduct ($productId: ID!, $userId: ID!) {
		addFavoriteProduct(productId: $productId, userId: $userId) {
			id
			#favorite(id: $productId) @client
		}
	}
`;
export const REMOVE_FAVORITE_PRODUCT = gql`
	mutation RemoveFavoriteProduct ($productId: ID!, $userId: ID!) {
		removeFavoriteProduct(productId: $productId, userId: $userId) {
			id
			#favorite(id: $productId) @client
		}
	}
`;

export const LOAD_PRODUCT = gql`
	query loadProducts ($id: ID!, $filter:Filter, $location: GeoPoint!) {
		product (id: $id) {
			...ListProductFragment
			price
			favorite(id: $id) @client

			company(location: $location) {
				...CompanyLocationFields
			}
			category {
				id
				name
			}
			optionsGroups(filter: $filter) {
				...OptionsGroupFields
			}
		}
	}

	${COMPANY_LOCATION_FRAGMENT}
	${OPTIONS_GROUP_FRAGMENT}
	${LIST_PRODUCT_FRAGMENT}
`;
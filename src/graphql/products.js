import gql from 'graphql-tag';

import {
	OPTIONS_GROUP_FRAGMENT,
	LIST_PRODUCT_FRAGMENT,
	COMPANY_LOCATION_FRAGMENT,
	LIST_PRODUCT_FRAGMENT_NO_COMPANY
} from './fragments';

export const LOAD_FEED = gql`
	query LOAD_FEED ($onSaleLimit: Int!, $bestSellersLimit: Int!, $location: GeoPoint!, $pagination: Pagination) {
		productsOnSale(limit: $onSaleLimit, location: $location) {
			...ListProductFragment
			
		}

		bestSellers (limit: $bestSellersLimit, location: $location) {
			...ListProductFragment
			
		}

		companies(location: $location, pagination: $pagination) {
			...CompanyLocationFields
		}
	}

	${COMPANY_LOCATION_FRAGMENT}
	${LIST_PRODUCT_FRAGMENT}
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
	query loadProducts ($id: ID!, $filter:Filter) {
		product (id: $id) {
			...ListProductFieldsNoCompany
			price
			favorite(id: $id) @client

			category {
				id
				name
			}

			optionsGroups(filter: $filter) {
				...OptionsGroupFields
			}
		}
	}

	${OPTIONS_GROUP_FRAGMENT}
	${LIST_PRODUCT_FRAGMENT_NO_COMPANY}
`;
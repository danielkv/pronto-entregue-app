import gql from 'graphql-tag';

import { COMPANY_DELIVERY_FRAGMENT, COMPANY_PICKUP_FRAGMENT, OPTIONS_GROUP_FRAGMENT } from './fragments';

export const LOAD_FEED = gql`
	query LOAD_FEED ($onSaleLimit: Int!, $bestSellersLimit: Int!, $location: GeoPoint!, $pagination: Pagination) {
		productsOnSale(limit: $onSaleLimit, location: $location) {
			id
			name
			image
			description
			price
			fromPrice
			company {
				id
				displayName
				isOpen
			}
			sale {
				price
			}
		}

		bestSellers (limit: $bestSellersLimit, location: $location) {
			id
			name
			description
			image
			price
			fromPrice
			sale {
				price
				progress
			}
		}

		companies(location: $location, pagination: $pagination) {
			id
			displayName
			isOpen
			image
			backgroundColor
			rate
			deliveryTime
			distance
			delivery {
				...CompanyDeliveryFields
			}
			pickup {
				...CompanyPickupFields
			}
		}
	}

	${COMPANY_DELIVERY_FRAGMENT}
	${COMPANY_PICKUP_FRAGMENT}
	
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
			id
			name
			type
			price
			description
			favorite(id: $id) @client
			company(location: $location) {
				id
				displayName
				acceptTakeout
				deliveryTime
				isOpen
				image
				backgroundColor
				rate
				distance
				delivery {
					...CompanyDeliveryFields
				}
				pickup {
					...CompanyPickupFields
				}
				countRatings
			}
			category {
				id
				name
			}
			sale {
				price
				progress
			}
			image
			active
			optionsGroups(filter: $filter) {
				...OptionsGroupFields
			}
		}
	}
	${OPTIONS_GROUP_FRAGMENT}
	${COMPANY_DELIVERY_FRAGMENT}
	${COMPANY_PICKUP_FRAGMENT}
`;
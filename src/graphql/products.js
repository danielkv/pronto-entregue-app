import gql from 'graphql-tag';

export const LIST_PRODUCT_FRAGMENT = gql`
	fragment ListProductFragment on Product {
		id
		name
		description
		image
		fromPrice
		company {
			id
			displayName
			deliveryTime
			isOpen
		}
		sale {
			price
			progress
		}
	}
`;

export const LOAD_FEED = gql`
	query LOAD_FEED ($onSaleLimit: Int!, $bestSellersLimit: Int!, $location: GeoPoint!) {
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
	}
`;

export const OPTIONS_GROUP_FRAGMENT = gql`
	fragment OptionsGroupFields on OptionsGroup {
		id
		name
		active
		type
		priceType
		minSelect
		maxSelect
		groupRestrained {
			id
			name
		}
		restrainedBy {
			id
			name
		}
		options (filter: $filter) {
			id
			name
			description
			price
			maxSelectRestrainOther
		}
	}
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
			id
			name
			type
			price
			description
			favorite(id: $id) @client
			company {
				id
				displayName
				acceptTakeout
				deliveryTime
				isOpen
				image
				backgroundColor
				rate
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
`;
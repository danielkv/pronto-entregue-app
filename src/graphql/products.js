import gql from 'graphql-tag';

export const GET_CATEGORY_PRODUCTS = gql`
	query GetCategoryProducts ($id: ID!) {
		category(id: $id) {
			id
			name
			products {
				id
				name
				image
				price
				fromPrice
			}
		}
	}
`;

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
		}
		sale {
			price
			progress
		}
	}
`;

export const GET_PRODUCTS_ON_SALE = gql`
	query GetProductsOnSale ($limit: Int!, $location: GeoPoint!) {
		productsOnSale(limit: $limit, location: $location) {
			id
			name
			image
			description
			price
			fromPrice
			company {
				displayName
			}
			sale {
				price
			}
		}
	}
`;

export const GET_BEST_SELLERS = gql`
	query GetBestSellers ($limit: Int!, $location: GeoPoint!) {
		bestSellers (limit: $limit, location: $location) {
			id
			name
			description
			image
			price
			fromPrice
		}
	}
`;

export const OPTIONS_GROUP_FRAGMENT = gql`
	fragment OptionsGroupFields on OptionsGroup {
		id
		name
		active
		type
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
		options (filter:$filter) {
			id
			name
			price
			maxSelectRestrainOther
		}
	}
`;

export const LOAD_OPTION_GROUP = gql`
	query loadOptionGroup ($id: ID!, $filter:Filter) {
		optionsGroup (id:$id) {
			...OptionsGroupFields
		}
	}
	${OPTIONS_GROUP_FRAGMENT}
`;

export const LOAD_BRANCH_FETURED_PRODUCTS = gql`
	query loadBranchFeaturedProducts ($id: ID!, $limit: Int!) {
		branch (id: $id) {
			id
			featuredProducts (limit: $limit) {
				id
				name
				image
				type
				price
			}
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
				image
				rate
			}
			category {
				id
				name
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

export const CREATE_PRODUCT = gql`
	mutation ($data:ProductInput!) {
		createProduct (data:$data) {
			id
			name
			createdAt
			active
		}
	}
`;

export const UPDATE_PRODUCT = gql`
	mutation ($id:ID!, $data:ProductInput!, $filter:Filter) {
		updateProduct (id:$id, data:$data) {
			id
			name
			type
			price
			description
			category {
				id
				name
			}
			image
			active
			optionsGroups (filter:$filter) {
				...OptionsGroupFields
			}
		}
	}
	${OPTIONS_GROUP_FRAGMENT}
`;
import gql from 'graphql-tag';

export const GET_CATEGORY_PRODUCTS = gql`
	query ($search:String!) {
		category(id:$id) {
			id
			name
			product {
				id
				name
				price
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
		min_select
		max_select
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
			item {
				id
				name
			}
			max_select_restrain_other
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

export const LOAD_FETURED_PRODUCTS = gql`
	query loadFeaturedProducts ($limit: Int!) {
		featuredProducts (limit: $limit) {
			id
			name
			image
			type
			price
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
			category {
				id
				name
			}
			image
			active
			options_groups(filter:$filter) {
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

export const GET_BRANCHES_PRODUCTS = gql`
	query ($id:ID!, $filter:Filter) {
		branch (id:$id) {
			id
			products (filter:$filter) {
				id
				name
				image
				active
				price
				options_qty
				createdAt
				category {
					id
					name
				}
			}
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
			options_groups (filter:$filter) {
				...OptionsGroupFields
			}
		}
	}
	${OPTIONS_GROUP_FRAGMENT}
`;
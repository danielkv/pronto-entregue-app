import gql from 'graphql-tag';

import { LIST_PRODUCT_FRAGMENT } from './products';

export const SEARCH_PRODUCTS_COMPANIES = gql`
	mutation searchOnApp($search: String!, $location: GeoPoint!) {
		products: searchProductsOnApp(search: $search, location: $location) {
			...ListProductFragment
		}
		companies: searchCompaniesOnApp(search: $search, location: $location) {
			id
			displayName
			image
			backgroundColor
			rate
			deliveryTime
			distance(location: $location)
		}
	}

	${LIST_PRODUCT_FRAGMENT}
`
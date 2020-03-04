import gql from 'graphql-tag';

export const SEARCH_PRODUCTS_COMPANIES = gql`
	mutation searchOnApp($search: String!, $location: GeoPoint!) {
		products: searchProductsOnApp(search: $search, location: $location) {
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
		companies: searchCompaniesOnApp(search: $search, location: $location) {
			id
			displayName
			image
			rate
			deliveryTime
			distance(location: $location)
		}
	}
`
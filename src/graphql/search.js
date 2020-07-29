import gql from 'graphql-tag';

import { LIST_PRODUCT_FRAGMENT, COMPANY_MIN_FRAGMENT, COMPANY_LOCATION_FRAGMENT } from './fragments';


export const SEARCH_PRODUCTS_COMPANIES = gql`
	mutation searchOnApp($search: String!, $location: GeoPoint!) {
		products: searchProductsOnApp(search: $search, location: $location) {
			...ListProductFragment
			company {
				...CompanyMinFields
			}
		}
		companies: searchCompaniesOnApp(search: $search, location: $location) {
			...CompanyLocationFields
		}
	}

	${COMPANY_LOCATION_FRAGMENT}
	${COMPANY_MIN_FRAGMENT}
	${LIST_PRODUCT_FRAGMENT}
`
import gql from 'graphql-tag';

export const SEARCH_ADDRESS = gql`
	mutation ($search: String!) {
		searchAddress(search: $search) {
			street
			number
			district
			city
			state
			zipcode
			location
		}
	}
`;

export const SEARCH_LOCATION = gql`
	mutation ($location: GeoPoint!) {
		searchLocation(location: $location) {
			street
			number
			district
			city
			state
			zipcode
			location
		}
	}
`;
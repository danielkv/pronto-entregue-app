import gql from 'graphql-tag';

export const SEARCH_ADDRESS = gql`
	mutation searchAddress ($search: String!) {
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
	mutation searchLocation ($location: GeoPoint!) {
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

export const GET_SELECTED_ADDRESS = gql`
	query selectedAddress {
		selectedAddress @client {
			id
			name
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

export const SET_SELECTED_ADDRESS = gql`
	mutation setSelectedAddress ($address: AddressInput!, $force: Boolean) {
		setSelectedAddress (address: $address, force: $force) @client
	}
`;
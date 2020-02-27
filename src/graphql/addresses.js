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
	mutation setSelectedAddress ($address: AddressInput!) {
		setSelectedAddress (address: $address) @client
	}
`;
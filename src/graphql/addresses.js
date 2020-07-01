import gql from 'graphql-tag';

import { ADDRESS_FRAGMENT } from './fragments';

export const SEARCH_ADDRESS = gql`
	mutation searchAddress ($search: String!) {
		searchAddress(search: $search) {
			...AddressFields
		}
	}

	${ADDRESS_FRAGMENT}
`;

export const SEARCH_LOCATION = gql`
	mutation searchLocation ($location: GeoPoint!) {
		searchLocation(location: $location) {
			...AddressFields
		}
	}
	${ADDRESS_FRAGMENT}
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
			reference
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

export const SET_USER_ADDRESS = gql`
	mutation SetUserAddress ($addressData: AddressInput!, $userId: ID) {
		setUserAddress (addressData: $addressData, userId: $userId) {
			...AddressFields
		}
	}

	${ADDRESS_FRAGMENT}
`;
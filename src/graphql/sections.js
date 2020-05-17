import gql from 'graphql-tag';

export const GET_SECTIONS = gql`
	query GetSections ($limit: Int, $location: GeoPoint!) {
		sections (limit: $limit, location: $location) {
			id
			name
			image
		}
	}
`;

export const LOAD_SECTION = gql`
	query LoadSection ($id: ID!, $location: GeoPoint!) {
		section: companyType (id: $id) {
			id
			name
			image
			description
			active
		}
	}
`;
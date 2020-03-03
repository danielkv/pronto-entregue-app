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
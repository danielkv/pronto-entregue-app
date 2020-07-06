import gql from 'graphql-tag';

export const ADDRESS_FRAGMENT = gql`
	fragment AddressFields on Address {
		id
		name
		street
		number
		district
		reference
		city
		state
		zipcode
		location
	}
`;

export const OPTIONS_GROUP_FRAGMENT = gql`
	fragment OptionsGroupFields on OptionsGroup {
		id
		name
		active
		type
		priceType
		minSelect
		maxSelect
		groupRestrained {
			id
			name
		}
		restrainedBy {
			id
			name
		}
		options (filter: $filter) {
			id
			name
			description
			price
			maxSelectRestrainOther
		}
	}
`;

export const LIST_PRODUCT_FRAGMENT = gql`
	fragment ListProductFragment on Product {
		id
		name
		description
		image
		fromPrice
		company {
			id
			displayName
			deliveryTime
			isOpen
		}
		sale {
			price
			progress
		}
	}
`;

export const COMPANY_DELIVERY_FRAGMENT = gql`
	fragment CompanyDeliveryFields on DeliveryArea {
		id
		name
		price
	}
`;
export const COMPANY_PICKUP_FRAGMENT = gql`
	fragment CompanyPickupFields on ViewArea {
		id
		name
	}
`;
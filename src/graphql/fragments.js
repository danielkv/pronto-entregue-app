import gql from 'graphql-tag';

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

export const ADDRESS_FRAGMENT = gql`
	fragment AddressFields on Address {
		id
		name
		street
		number
		district
		reference
		complement
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

export const COMPANY_MIN_FRAGMENT = gql`
	fragment CompanyMinFields on Company {
		id
		image
		displayName
		backgroundColor
	}
`;

export const COMPANY_LIST_FRAGMENT = gql`
	fragment CompanyListFields on Company {
		...CompanyMinFields

		allowBuyClosed
		nextOpen
		nextClose
		isOpen

		configs(keys:["deliveryTime"])
	}

	${COMPANY_MIN_FRAGMENT}
`;

export const COMPANY_LOCATION_FRAGMENT = gql`
	fragment CompanyLocationFields on Company {
		...CompanyListFields
		rate
		distance
		countRatings
		delivery {
			...CompanyDeliveryFields
		}
		pickup {
			...CompanyPickupFields
		}
	}
	
	${COMPANY_DELIVERY_FRAGMENT}
	${COMPANY_PICKUP_FRAGMENT}
	${COMPANY_LIST_FRAGMENT}
`;

export const LIST_PRODUCT_FRAGMENT_NO_COMPANY = gql`
	fragment ListProductFieldsNoCompany on Product {
		id
		name
		description
		image
		fromPrice
		minDeliveryTime
		scheduleEnabled
		
		sale {
			price
			progress
		}
	}
`;

export const LIST_PRODUCT_FRAGMENT = gql`
	fragment ListProductFragment on Product {
		...ListProductFieldsNoCompany

		company {
			...CompanyMinFields
		}
	}

	${LIST_PRODUCT_FRAGMENT_NO_COMPANY}
	${COMPANY_MIN_FRAGMENT}
`;
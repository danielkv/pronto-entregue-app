import isMinimumValidAddress from './isMinimumValidAddress';

export default function isValidAddress(address) {
	return isMinimumValidAddress(address)

		&& address.name
		&& address.street
		&& address.number
		&& address.district
		&& address.reference
		&& address.zipcode
}
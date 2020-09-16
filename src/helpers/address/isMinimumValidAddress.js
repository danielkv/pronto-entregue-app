import _ from 'lodash';

export default function isMinimumValidAddress(address) {
	return (_.has(address, 'name')
		&& _.has(address, 'street')
		&& _.has(address, 'number')
		&& _.has(address, 'district')
		&& _.has(address, 'city')
		&& _.has(address, 'state')
		&& _.has(address, 'reference')
		&& _.has(address, 'complement')
		&& _.has(address, 'zipcode')
		&& _.has(address, 'location'))
		
		&& _.isArray(address.location)

		&& Boolean(address.city
		&& address.state)
}
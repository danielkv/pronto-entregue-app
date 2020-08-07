import _ from 'lodash';

import getProductFinalPrice from './getProductFinalPrice';

export default function sanitizeCartData(data) {
	return {
		id: _.uniqueId(),
		productId: data.id,
		image: data.image,
		name: data.name,
		price: getProductFinalPrice(data),
		quantity: data.quantity,
		message: data.message || '',
		company: {
			...data.company,
			__typename: 'CartCompany'
		},
		__typename: 'CartItem',

		scheduleEnabled: data.scheduleEnabled,
		minDeliveryTime: data.minDeliveryTime,

		optionsGroups: data.optionsGroups.filter(group=>group.options.some(option=>option.selected)).map(group =>{
			return {
				id: _.uniqueId(),
				name: group.name,
				priceType: group.priceType,
				optionsGroupId: group.id,
				__typename: 'CartOptionsGroup',

				options: group.options.filter(option=>option.selected).map(option => {
					return {
						id: _.uniqueId(),
						name: option.name,
						description: option.description,
						price: option.price,
						optionId: option.id,
						__typename: 'CartOption',
					};
				})
			}
		})
	}
}
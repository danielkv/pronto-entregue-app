import moment from "moment";

import { sanitizeAddress } from "../controller/address";

export default function sanitizeOrderData ({ userId, user, address, cartCompany, cartScheduled, cartItems, cartStatus, cartPrice, cartMessage, cartDiscount, cartDelivery, cartPayment, cartUseCredits, cartCoupon }) {
	return {
		userId: userId || user.id,
		type: cartDelivery.type,
		status: cartStatus || 'waiting',
		paymentMethodId: cartPayment?.id || null,
		useCredits: cartUseCredits || false,
		couponId: cartCoupon?.id || null,
		companyId: cartCompany.id,

		paymentFee: cartPayment?.price || 0,
		deliveryPrice: cartDelivery.price || 0,
		discount: cartDiscount || 0,
		price: cartPrice,
		message: cartMessage,

		scheduledTo: cartScheduled ? moment(cartScheduled).valueOf() : null,
		
		address: sanitizeAddress(address),
		
		products: cartItems.map(product => ({
			action: 'create',
			name: product.name,
			price: product.price,
			quantity: product.quantity,
			message: product.message || '',
			productRelatedId: product.productId,

			optionsGroups: product.optionsGroups?.map(group => ({
				name: group.name,
				optionsGroupRelatedId: group.optionsGroupId,

				options: group.options?.map(option => ({
					name: option.name,
					description: option.description,
					price: option.price,
					optionRelatedId: option.optionId,
				})) || []
			})) || []
		}))
	}
}
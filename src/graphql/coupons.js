import gql from 'graphql-tag';

export const CHECK_COUPON = gql`
	mutation CheckCoupon ($couponName: String!, $order: OrderInput!) {
		checkCoupon (couponName: $couponName, order: $order) {
			id
			name
			image
			valueType
			value
			freeDelivery
		}
	}
`;
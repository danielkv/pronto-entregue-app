export default function calculateCouponValue(coupon, subtotal, deliveryPrice) {
	return coupon.valueType === 'value' ? Number(coupon.value) : Number(coupon.value) / 100 * (Number(subtotal) - Number(deliveryPrice))
}
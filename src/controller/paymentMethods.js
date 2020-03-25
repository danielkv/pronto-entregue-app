export function sanitizePaymentMethod(method) {
	return {
		displayName: method.displayName,
		image: method.image,
		type: method.type,
		id: method.id
	}
}
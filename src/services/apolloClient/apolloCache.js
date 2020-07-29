import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache({});

export const initialData = {
	loggedUserId: null,
	userToken: null,
	selectedCompany: null,
	selectedAddress: null,

	// CART
	cartCompany: null,
	cartDelivery: null,
	cartPayment: null,
	cartItems: [],
	cartPrice: 0,
	cartSubtotal: 0,
	cartMessage: '',
	cartDiscount: 0,
	cartUseCredits: false,
	cartCoupon: null,
	cartScheduled: null
}

cache.writeData({ data: initialData });

export default cache;
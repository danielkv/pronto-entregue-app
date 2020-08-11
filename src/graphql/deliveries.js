import gql from 'graphql-tag';

import { ADDRESS_FRAGMENT } from './fragments';


export const FRAGMENT_DELIVERY = gql`
	fragment DeliveryFields on Delivery {
		id
		description
		value
		status
		receiverName
		receiverContact
		senderContact
		deliveryMan {
			id
			canAcceptDelivery
			user {
				id
			}
		}
		from {
			...AddressFields
		}
		to {
			...AddressFields
		}
	}

	${ADDRESS_FRAGMENT}
`

export const UPDATE_DELIVERY_SUBSCRIPTION = gql`
	subscription {
		delivery {
			...DeliveryFields
		}
	}
	${FRAGMENT_DELIVERY}
`;

export const GET_DELIVERIES = gql`
	query GetDeliveries ($filter: JSON) {
		deliveries(filter: $filter) {
			...DeliveryFields
		}
	}

	${FRAGMENT_DELIVERY}
`;

export const INDEX_DELIVERIES = gql`
	query IndexDeliveries ($waitingDelivery: JSON, $active: JSON, $delivered: JSON, $week: JSON, ) {
		waitingDelivery: countDeliveries (filter: $waitingDelivery)
		active: countDeliveries (filter: $active)
		delivered: countDeliveries (filter: $delivered)
		week: countDeliveries (filter: $week)
	}
`;

export const GET_DELIVERY_MAN = gql`
	query GetDeliveryMan ($userId: ID!) {
		deliveryMan(userId: $userId) {
			id
			canAcceptDelivery
			isEnabled
		}
	}
`;

export const ENABLE_DELIVERY_MAN = gql`
	mutation EnableDeliveryMan ($userId: ID!) {
		enableDeliveryMan(userId: $userId) {
			id
			canAcceptDelivery
			isEnabled
		}
	}
`;

export const DISABLE_DELIVERY_MAN = gql`
	mutation EnableDeliveryMan ($userId: ID!) {
		disableDeliveryMan(userId: $userId) {
			id
			canAcceptDelivery
			isEnabled
		}
	}
`;

export const SET_DELIVERY_MAN = gql`
	mutation SetDeliveryMan ($deliveryId: ID!, $userId: ID!) {
		setDeliveryMan(deliveryId: $deliveryId, userId: $userId) {
			...DeliveryFields
		}
	}

	${FRAGMENT_DELIVERY}
`;

export const CHANGE_DELIVERY_STATUS = gql`
	mutation ChangeDeliveryStatus ($deliveryId: ID!, $newStatus: String!) {
		changeDeliveryStatus(deliveryId: $deliveryId, newStatus: $newStatus) {
			id
			status
		}
	}
`;
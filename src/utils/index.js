import { Alert } from 'react-native';

import { getErrorMessage } from './errors';

export function regionFromCoordinates(coordinates, distance) {
	const finalDistance = distance/2
	const [lat, lon] = coordinates;

	const circumference = 40075;
	const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
	const angularDistance = finalDistance / circumference;

	const latitudeDelta = finalDistance / oneDegreeOfLatitudeInMeters;
	const longitudeDelta = Math.abs(Math.atan2(
		Math.sin(angularDistance)*Math.cos(lat),
		Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

	return {
		latitude: lat,
		longitude: lon,
		latitudeDelta,
		longitudeDelta,
	}
}


export function calculateDistance({ latitude: lat1, longitude: lon1 }, { latitude: lat2, longitude: lon2 }) {
	const R = 6371; // km
	const dLat = toRad(lat2-lat1);
	const dLon = toRad(lon2-lon1);
	const calcLat1 = toRad(lat1);
	const calcLat2 = toRad(lat2);

	const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(calcLat1) * Math.cos(calcLat2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	const d = R * c;

	return d * 1000;
}

// Converts numeric degrees to radians
function toRad(Value)
{
	return Value * Math.PI / 180;
}

export function getStatusText (status) {
	switch (status) {
		case 'waiting':
			return 'Aguardando';
		case 'preparing':
			return 'Preparando';
		case 'delivering':
			return 'Na Entrega'
		case 'delivered':
			return 'Entregue';
		case 'canceled':
			return 'Cancelado';
		default:
			return '';
	}
}

export const getOrderStatusIcon = (status) => {
	// isIn: [['waiting', 'preparing', 'delivery', 'delivered', 'canceled']],
	switch(status) {
		case 'waiting':
			return { type: 'material-community', name: 'clock', color: '#363E5E' }
		case 'preparing':
			return { type: 'material-community', name: 'silverware-spoon', color: '#363E5E' }
		case 'delivering':
			return { name: 'truck', color: '#363E5E' }
		case 'delivered':
			return { type: 'material-community', name: 'check-circle', color: '#058F0A' }
		case 'canceled':
			return { type: 'material-community', name: 'close-circle-outline', color: '#E63A3A' }
		default: return '';
	}
}

export const getStatusColors = (status) => {
	switch (status) {
		case 'delivered':
			return {
				background: '#A4D82B',
				text: '#000'
			};
		case 'delivering':
			return {
				background: '#FFCA39',
				text: '#333'
			};
		case 'canceled':
			return {
				background: '#f44336',
				text: '#fff'
			};
		case 'preparing':
		case 'waiting':
		default:
			return {
				background: '#000',
				text: '#fff'
			};
	}
}

export function checkCondition(condition, navigation, errorMessage, navigateTo = 'FeedScreen') {
	let result = condition;
	if (typeof condition === 'function') {
		try {
			condition();
			result = true;
		} catch (err) {
			result = false;
			// eslint-disable-next-line no-param-reassign
			errorMessage = getErrorMessage(err);
		}
	}
	
	if (!result) {
		Alert.alert(
			'Hmm... Algo está errado!',
			errorMessage,
			[
				{ text: 'OK', onPress: ()=>navigation.navigate(navigateTo) }
			],
			{ cancelable: false }
		)
	}

	return !result;
}
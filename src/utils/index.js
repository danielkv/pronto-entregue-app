import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import theme from '../theme';
import { getErrors } from './errors';

export const getStatusText = (status) => {
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

export const getStatusColors = (status) => {
	switch (status) {
	case 'delivered':
		return {
			background: '#fff',
			text: '#000'
		};
	case 'delivery':
		return {
			background: '#FFCA39',
			text: '#000'
		};
	case 'canceled':
		return {
			background: theme.colors.error,
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

export function checkCondition(condition, errorMessage, navigateTo = 'HomeScreen') {
	const navigation = useNavigation();
	let result = condition;
	if (typeof condition === 'function') {
		try {
			condition();
			result = true;
		} catch (err) {
			result = false;
			// eslint-disable-next-line no-param-reassign
			errorMessage = getErrors(err);
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
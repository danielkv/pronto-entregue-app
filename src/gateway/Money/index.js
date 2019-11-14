import React from 'react';
import { Icon } from 'react-native-elements';

import {
	GataweyContainer,
	GetawayTitle,
	GetawayIconContainer,
} from '../styles'

export const Option = ({ onPress }) => {
	return (
		<GataweyContainer onPress={onPress}>
			<GetawayIconContainer>
				<Icon type='material-community' name='cash' size={24} color='#fff' />
			</GetawayIconContainer>
			<GetawayTitle>Dinheiro</GetawayTitle>
		</GataweyContainer>
	);
}

export const Finish = () => {
	return (
		<GataweyContainer>
			<GetawayIconContainer>
				<Icon type='material-community' name='credit-card' size={24} color='#fff' />
			</GetawayIconContainer>
			<GetawayTitle>Dinheiro</GetawayTitle>
		</GataweyContainer>
	);
}
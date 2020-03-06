import React from 'react';
import { Text, Icon } from 'react-native-elements';

import styled from 'styled-components/native';

import theme from '../../theme';

export const Container = styled.View`
	background-color: ${theme.palette.primary.main};
	flex: 1;
`;

export const HeaderContainer = styled.View`
	padding: 20px;
	flex-direction: row;
	align-items: center;
`;
export const HeaderInfoContainer = styled.View`
	margin-left: 10px;
	flex: 1;
	flex-direction: column;
`;
export const UserName = styled(Text)`
	color: #fff;
	font-size: 18px;
	font-weight: bold;
`;
export const UserEmail = styled(Text)`
	color: #fff;
	font-size: 12px;
	font-weight: 100;
`;
export const HeaderInfo = styled(Text)`
  
`;
export const MenuContainer = styled.View`
	margin-bottom: 15px;
	flex: 1;
`;

const ItemLabel = styled(Text)`
	font-size: 16px;
	margin-left: 15px;
	font-weight: bold;
`;

export function getDraweItemProps({ icon, label }) {
	return {
		icon: ({ color }) => (<Icon type='material-community' name={icon} color={color} size={24} />),
		activeTintColor: '#fff',
		inactiveTintColor: '#fff',
		activeBackgroundColor: 'rgba(255,255,255,.3)',
		label: ({ color }) => <ItemLabel style={{ color }}>{label}</ItemLabel>
	}
}

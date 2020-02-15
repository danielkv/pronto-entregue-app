import { Text } from 'react-native-elements';
import { vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

import theme from '../../../theme';
import { getStatusColors } from '../../../utils';

export const Container = styled.TouchableOpacity`
	height: 125px;
	border-radius: 4px;
	background-color: ${theme.palette.divider};
	padding: 20px;
	margin-bottom: ${vh(3)}px;
`;
export const DateTime = styled(Text)`
	color: #fff;
	font-size: 18px;
	font-weight: bold;
`;
export const OrderFooter = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-top: auto;
	
`;
export const OrderItems = styled(Text)`
	color: #fff;
	font-size: 12px;
	font-weight: normal;
`;
export const OrderPrice = styled(Text)`
	color: #fff;
	font-size: 20px;
	font-weight: bold;
`;
export const StatusBadge = styled.View`
	padding: 5px 8px;
	border-radius:3px;

	${({ status }) => {
		const { background } = getStatusColors(status);
		return `background-color: ${background};`
	}}
`;
export const StatusBadgeText = styled(Text)`
	font-size: 12px;
	font-weight: normal;

	${({ status }) => {
		const { text } = getStatusColors(status);
		return `color: ${text};`
	}}
`;

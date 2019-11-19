import styled from 'styled-components/native';
import { Text } from 'react-native-elements';
import { vh } from 'react-native-expo-viewport-units';

import theme from '../../../theme';

export const Container = styled.TouchableOpacity`
	height: 125px;
	border-radius: 4px;
	background-color: ${theme.colors.divider};
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
export const StatusBadge = styled(Text)`
	color: #fff;
	font-size: 12px;
	font-weight: normal;

	padding: 5px 8px;
	border-radius:3px;
	${({ status }) => {
		switch (status) {
		case 'delivered':
			return 'background-color: #fff; color: #000;';
		case 'delivery':
			return 'background-color: #FFCA39; color #000;';
		case 'canceled':
			return `background-color: ${theme.colors.error} ; color #fff;`;
		case 'preparing':
		case 'waiting':
		default:
			return 'background-color: #000; color #fff;';
		}
	}}
`;

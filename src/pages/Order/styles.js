import styled from 'styled-components/native';
import { Text } from 'react-native-elements';
import { vw, vh } from 'react-native-expo-viewport-units';

import theme from '../../theme';
import { getStatusColors } from '../../utils';

export const ContainerScroll = styled.ScrollView`
  
`;
export const StatusCard = styled(Text)`
	${({ status }) => {
		const { background, text } = getStatusColors(status);
		return `background-color: ${background}; color: ${text};`
	}}
	text-align:center;
	font-size: 14px;
	font-weight: normal;

	padding: 5px 8px;
	border-radius:3px;
`;

export const Container = styled.View`
	margin: ${theme.header.height + vw(5)}px ${vw(5)}px 0 ${vw(5)}px;
`;
export const BlocksContainer = styled.View`
	margin-top: ${vh(3)}px;
`;
export const OrderItems = styled.View`
	
`;
export const ItemsContainer = styled.View`
	margin: ${vh(2)}px 0;
`;
export const CancelButton = styled.TouchableOpacity`
	background-color: ${theme.colors.error};
	border-radius: 4px;
	padding: 10px;
`;
export const CancelButtonText = styled(Text)`
	color: #fff;
	text-align: center;
`;

import { Text } from 'react-native-elements';
import { vw, vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

export const ContainerScroll = styled.ScrollView`
  
`;

export const Container = styled.View`
`;
export const BlocksContainer = styled.View`
	margin-top: 10px;
`;
export const OrderItems = styled.View`
	
`;
export const ItemsContainer = styled.View`
	margin: ${vh(2)}px 0;
`;
export const CancelButton = styled.TouchableOpacity`
	background-color: ${({ theme })=>theme.palette.error.main};
	border-radius: 4px;
	padding: 10px;
`;
export const CancelButtonText = styled(Text)`
	color: #fff;
	text-align: center;
`;

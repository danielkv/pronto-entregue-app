import { Text } from 'react-native-elements';
import { vw, vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
`;

export const CartContainerScroll = styled.ScrollView`
	
`;

export const CardContainer = styled.TouchableOpacity`
	background-color: #fff;
	border-radius: 4px;
	padding: 20px;
	margin: 7px 0;
`;
export const CardHeader = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 20px;
`;
export const CardContent = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;
export const CardTitle = styled(Text)`
	color: #aaa;
	font-size: 16px;
	font-weight: 100;
	margin-left: 10px;
`;
export const CardInfo = styled(Text)`
	margin-right: 10px;
`;
export const CardPrice = styled(Text)`
	position: absolute;
	right: 0;
	bottom: 0;
	color: #000;
	font-size: 16px;
	font-weight: bold;
`;

export const CartButtonContainer = styled.View`
	background-color:#111;
	padding:${vh(4)}px ${vw(5)}px;

	${()=>'shadow-color: #000;	shadow-offset: 0 2px; shadow-opacity: 0.25; shadow-radius: 3.84px; elevation:5;'}
`;
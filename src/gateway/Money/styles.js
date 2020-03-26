import { Text } from 'react-native-elements';
import { vh, vw } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

import theme from '../../theme';

export const FinishContainer = styled.View`
	flex:1;
`;

export const ErrorMessage = styled(Text)`
	color: ${theme.palette.error};
	text-align: center;
`;
export const CartButtonContainer = styled.View`
	background-color:#111;
	padding:${vh(4)}px ${vw(5)}px;

	${()=>'shadow-color: #000;	shadow-offset: 0 2px; shadow-opacity: 0.25; shadow-radius: 3.84px; elevation:5;'}
`;
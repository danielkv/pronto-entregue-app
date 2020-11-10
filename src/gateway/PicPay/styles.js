import { vh, vw } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

import { Typography } from '../../react-native-ui';
import theme from '../../theme';

export const FormContainer = styled.View`
	flex:1;
	justify-content:center;
	margin: ${theme.header.height}px ${vw(3)}px 0 ${vw(3)}px;
`;
export const Title = styled(Typography)`
	color: #fff;
	text-align: center;
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 20px;
`;
export const ErrorMessage = styled(Typography)`
	color: ${theme.palette.error};
	text-align: center;
`;
export const CartButtonContainer = styled.View`
	background-color:#111;
	padding:${vh(4)}px ${vw(5)}px;

	${() => 'shadow-color: #000;	shadow-offset: 0 2px; shadow-opacity: 0.25; shadow-radius: 3.84px; elevation:5;'}
`;
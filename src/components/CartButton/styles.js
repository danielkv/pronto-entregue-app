import styled from 'styled-components/native';

import { Typography } from '../../react-native-ui';

export const ButtonContainer = styled.TouchableOpacity`
  	background-color: ${({ theme }) => theme.palette.primary.main};
	height: 40px;
	
	border-radius:20px;
	flex-direction:row;
	overflow:hidden;

	${()=>'shadow-color: #000;	shadow-offset: 0 2px;	shadow-opacity: 0.23;	shadow-radius: 2.62px;	elevation:4;'}
`;

export const ButtonTextContainer = styled.View`
	flex-direction:row;
	align-items:center;
	flex:1;
	padding-left: 15px;
`;

export const ButtonTitle = styled(Typography)`
	color:#fff;
	font-size:16px;
	font-weight:bold;
	margin-left:5px;
`;

export const ButtonPriceContainer = styled.View`
	background-color:#fff;
	padding:6px 12px;
	justify-content:center;
`;

export const ButtonPrice = styled(Typography)`
	color:#333;
	font-size:14px;
	font-weight:bold;
`;
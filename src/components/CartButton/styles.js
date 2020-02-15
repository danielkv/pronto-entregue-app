import { Text } from 'react-native-elements';

import styled from 'styled-components/native';

import theme from '../../theme';

export const ButtonContainer = styled.TouchableOpacity`
  	background-color: ${theme.palette.primary};
	height:50px;
	
	border-radius:4px;
	flex-direction:row;
	overflow:hidden;

	${()=>'shadow-color: #000;	shadow-offset: 0 2px;	shadow-opacity: 0.23;	shadow-radius: 2.62px;	elevation:4;'}
`;

export const ButtonTextContainer = styled.View`
	flex-direction:row;
	align-items:center;
	flex:1;
	padding:10px 15px;
`;

export const ButtonTitle = styled(Text)`
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

export const ButtonPrice = styled(Text)`
	color:#336535;
	font-size:14px;
	font-weight:bold;
`;
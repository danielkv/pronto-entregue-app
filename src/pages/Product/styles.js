import { Text } from 'react-native-elements';
import { vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

export const Container = styled.View`
	flex:1;
`;
export const ProductContainer = styled.ScrollView`
	flex:1;
`;
export const HeaderContainer = styled.View`
	height:${vh(50)}px;
`;
export const HeaderImageBackgroundContainer = styled.ImageBackground`
	flex:1;
	justify-content:flex-end;
`;


export const CartButtonContainer = styled.View`
	background-color:#111;
	padding: 15px 35px;

	${()=>'shadow-color: #000;	shadow-offset: 0 2px; shadow-opacity: 0.25; shadow-radius: 3.84px; elevation:5;'}
`;
export const QuantityContainer = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-bottom: 15px;
`;
export const QuantityTitle = styled(Text)`
	color: #aaa;
	font-size: 12px;
	font-weight: 100;
	margin-right: 15px;
`;
export const Quantity = styled(Text)`
	margin: 0 15px;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
`;
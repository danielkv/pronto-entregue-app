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
	margin-bottom: -45px;
`;
export const HeaderImageBackgroundContainer = styled.ImageBackground`
	flex:1;
	justify-content:flex-end;
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
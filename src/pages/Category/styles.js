import { vw, vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

import { Typography } from '../../react-native-ui';
import theme from '../../theme';

export const Container = styled.View`
	margin-top:${theme.header.height}px;
`;

export const Card = styled.View`
	margin:${vh(2)}px ${vw(8)}px;
	background-color:#fff;
	border-radius:6px;
	padding:${vw(5)}px;
	height:${vh(20)}px;
`;

export const ProductContainer = styled.TouchableOpacity`
	margin:${vh(2)}px ${vw(8)}px;
	background-color:#fff;
	border-radius:6px;
	padding:${vw(5)}px;
	overflow: hidden;
	flex-direction:column;

	box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
`;

export const ProductWrapper = styled.View`
	flex-direction:row;
	margin-bottom:${vh(2)}px;
`;
export const ProductImageContainer = styled.View`
	
	
`;
export const ProductImage = styled.Image`
	height:140px;
	resize-mode:cover;
	aspect-ratio:1;
	border-radius:4px;
`;
export const ProductInfoContainer = styled.View`
	flex: 1;
	padding-left: ${vw(5)}px;
`;

export const ProductTitle = styled(Typography)`
	color:#000;
	font-size:18px;
`;
export const ProductDescription = styled(Typography)`
	color:#ccc;
`;
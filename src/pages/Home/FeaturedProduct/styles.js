import { ImageBackground, Dimensions } from 'react-native';

import styled from 'styled-components/native';
import { Text } from 'react-native-elements';

const { width } = Dimensions.get('window');

export const Container = styled(ImageBackground)`
	width: ${width}px;
	height: 100%;
	flex:1;
	justify-content:flex-end;
`;

export const ProductTitle = styled(Text)`
	color: #fff;
	text-transform:uppercase;
	text-align:center;
`;
export const ProductSubtitle = styled(Text)`
	color: #fff;
	text-align:	center;
`;
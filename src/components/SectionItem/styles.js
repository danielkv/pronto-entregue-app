import { ImageBackground } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

const size = (vw(100)-105)/2;

export const Container = styled.TouchableOpacity`
	width: ${({ dense })=>dense ? vw(35) : size}px;
	height: ${({ dense })=>dense ? 100 : 150}px;
	margin: ${({ dense })=>dense ? 8 : 17.5}px;
`;

export const BgImage = styled(ImageBackground).attrs({ borderRadius: 15 })`
	border-radius: 15px;
	justify-content: flex-end;
	overflow: hidden;
	flex: 1;
`;
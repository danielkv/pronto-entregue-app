import { ImageBackground } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

const size = (vw(100)-105)/2;

export const Container = styled.TouchableOpacity`
	width: ${size}px;
	height: 180px;
	margin: 17.5px;
`;

export const BgImage = styled(ImageBackground).attrs({ borderRadius: 15 })`
	border-radius: 15px;
	justify-content: flex-end;
	overflow: hidden;
	flex: 1;
`;
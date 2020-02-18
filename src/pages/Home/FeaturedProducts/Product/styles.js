import { ImageBackground } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

export const Container = styled.View`
  
`;

export const BgImage = styled(ImageBackground).attrs({ borderRadius: 15 })`
	width: ${({config})=> config.itemWidth}px;
	height: ${({config})=> config.itemHeight}px;
	border-radius: 15px;
	justify-content: flex-end;
`;
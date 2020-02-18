import { ImageBackground } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

export const Container = styled.View`
  
`;

export const BgImage = styled(ImageBackground).attrs({ borderRadius: 15 })`
	width: ${vw(70)}px;
	height: ${vh(30)};
	border-radius: 15px;
	justify-content: flex-end;
`;
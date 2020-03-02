import { ImageBackground } from 'react-native';

import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`

`;

export const TextContainer = styled.TouchableOpacity`
	max-width: 80%;
`;

export const BgImage = styled(ImageBackground).attrs({ borderRadius: 15 })`
	width: ${({ config })=> config.itemWidth}px;
	height: ${({ config })=> config.itemHeight}px;
	border-radius: 15px;
	justify-content: flex-end;
	overflow: hidden;
`;
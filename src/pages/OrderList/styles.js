import styled from 'styled-components/native';
import { vw } from 'react-native-expo-viewport-units';

import theme from '../../theme';

export const ContainerScroll = styled.ScrollView`

`;

export const Container = styled.View`
	margin: ${theme.header.height + vw(5)}px ${vw(5)}px 0 ${vw(5)}px;
`;

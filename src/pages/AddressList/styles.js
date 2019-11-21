import styled from 'styled-components/native';
import { vw } from 'react-native-expo-viewport-units';

import theme from '../../theme';

export const Container = styled.View`
	margin: ${theme.header.height}px ${vw(3)}px 0 ${vw(3)}px;
`;

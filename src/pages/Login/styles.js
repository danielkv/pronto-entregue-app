import styled from 'styled-components/native';
import { vw, vh } from 'react-native-expo-viewport-units';

import theme from '../../theme';

export const ContainerScroll = styled.ScrollView`
	flex:1;
`;
export const Container = styled.View`
	flex:1;
	justify-content:center;
	margin: ${theme.header.height + vh(5)}px ${vw(5)}px ${vw(5)}px ${vw(5)}px;
`;

export const LogoImage = styled.Image`
	align-self:center;
`;

export const FormContainer = styled.View`
	margin: 0 ${vw(8)}px;
`;
export const InputsContainer = styled.View`
	margin-top: 30px;
`;
export const ButtonsContainer = styled.View`
	margin-top: 30px;
`;
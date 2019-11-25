import styled from 'styled-components/native';
import { vw, vh } from 'react-native-expo-viewport-units';

import theme from '../../theme';

export const ContainerScroll = styled.ScrollView`
	flex:1;
`;
export const Container = styled.View`
	margin: ${theme.header.height}px ${vw(10)}px ${vh(5)}px ${vw(10)}px;
	flex:1;
`;

export const LogoImage = styled.Image`
	align-self: center;
	width: 180px;
	height: 65px;
	margin-top: ${vh(5)}px;
`;

export const FormContainer = styled.View`
	margin-top: ${vh(2)}px;
`;
export const InputsContainer = styled.View`
	
`;
export const ButtonsContainer = styled.View`
	margin-top: 30px;
`;
import { vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

export const ContainerScroll = styled.ScrollView`
	flex:1;
`;
export const Container = styled.View`
	margin-top: ${({ theme }) => theme.margin.top}px;
	margin-bottom: ${({ theme }) => theme.margin.bottom+vh(2)}px;
	margin-left: ${({ theme }) => theme.margin.left}px;
	margin-right: ${({ theme }) => theme.margin.right}px;
	flex:1;
`;

export const LogoImage = styled.Image`
	align-self: center;
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
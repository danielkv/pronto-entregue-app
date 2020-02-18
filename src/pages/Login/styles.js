import { vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

export const ContainerScroll = styled.ScrollView`
	flex:1;
`;
export const Container = styled.View`
	flex:1;
	justify-content: center;
	margin-top: ${({ theme }) => theme.margin.top}px;
	margin-bottom: ${({ theme }) => theme.margin.bottom+vh(2)}px;
	margin-left: ${({ theme }) => theme.margin.left}px;
	margin-right: ${({ theme }) => theme.margin.right}px;
`;

export const LogoImage = styled.Image`
	align-self:center;
	margin-top: ${vh(5)}px;
`;

export const FormContainer = styled.View`
	
`;
export const InputsContainer = styled.View`
	margin-top: 30px;
`;
export const ButtonsContainer = styled.View`
	margin-top: 30px;
`;
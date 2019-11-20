import styled from 'styled-components/native';
import { vw } from 'react-native-expo-viewport-units';

export const Container = styled.View`
	flex:1;
	justify-content:center;
`;

export const LogoImage = styled.Image`
	align-self:center;
`;

export const FormContainer = styled.View`
	margin: 0 ${vw(10)}px;
`;
export const InputsContainer = styled.View`
	margin-top: 30px;
`;
export const ButtonsContainer = styled.View`
	margin-top: 30px;
`;
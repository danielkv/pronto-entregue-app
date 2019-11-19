import styled from './node_modules/styled-components/native';
import { vw, vh } from './node_modules/react-native-expo-viewport-units';

import theme from '../../theme';

export const Container = styled.ScrollView`
	margin-top:${theme.header.height}px;
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
	margin-bottom: ${vh(5)}px;
	margin-left: ${vw(10)}px;
	margin-right: ${vw(10)}px;

`;
export const InputsContainer = styled.View`
	
`;
export const ButtonsContainer = styled.View`
	margin-top: 30px;
`;
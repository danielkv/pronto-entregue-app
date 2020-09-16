import Animated from 'react-native-reanimated';

import styled from 'styled-components/native';

export const ContainerScroll = styled.ScrollView`
	flex:1;
`;
export const Container = styled.View`
	flex:1;
`;

export const FormContainer = styled.View`
	align-items:center;
	margin: 0 10px;
`;
export const InputsContainer = styled.View`
	flex: 1;
	align-self:stretch;
	margin-top: 20px;
`;
export const ButtonsContainer = styled.View`
	align-self:stretch;
	margin-top: 30px;
`;
export const Dot = styled(Animated.View)`
	width: 5px;
	height: 5px;
	border-radius: 5px;
	background-color: #fff;
	overflow: visible;
	margin: 0 4px;
`;
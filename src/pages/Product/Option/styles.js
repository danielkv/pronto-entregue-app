import { vh, vw } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

export const TitleContainer = styled.View`
	flex-direction:row;
	align-items:center;
	flex:1;
`;
export const OptionIconContainer = styled.View`
	margin-right:${vw(3)}px;
`;

export const Container = styled.TouchableOpacity`
	border-width: 1px;
	padding-left: 8px;
	margin:${vh(1)}px 0;
	height: 40px;

	border-radius: 20px;
	flex-direction: row;
	align-items: center;
	overflow: hidden;

	background-color: ${({ selected }) => selected ? '#fff' : 'transparent'};
	border-color: ${({ theme, selected }) => selected ? 'transparent' : theme.palette.background.main};

	${({ selected })=>(selected && 'shadow-color: #000;	shadow-offset: 0 2px; shadow-opacity: 0.23; shadow-radius: 2.62px; elevation:6;')}
`;
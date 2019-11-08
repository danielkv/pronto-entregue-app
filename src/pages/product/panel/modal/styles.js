import styled from 'styled-components/native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { Text } from 'react-native-elements';

import theme from '../../../../theme';

export const ModalContainer = styled.View`
	flex:1;
	background-color:${theme.colors.primary};
`;

export const ModalHeader = styled.View`
	border-top-width:4px;
	border-top-color:#fff;
	flex-direction:row;
	padding: 0 10px;
	height:${vh(7)}px;
	align-items:center;
	justify-content:flex-start;
`;

export const ModalContent = styled.View`

`;

export const ModalClose = styled.View`
	margin-right:10px;
`;

export const ModalTitle = styled(Text)`
	font-size:15px;
	color:#fff;
	font-weight:bold;
`;

export const ModalPrice = styled(Text)`
	margin-left:auto;
	color:#fff;
	background-color: #000;
	padding:4px 10px;
	border-radius:3px;
	align-items:center;
	justify-content:center;
`;

export const ModalConfirm = styled.View`
	margin-left:10px;
`;

export const SearchContainer = styled.View`
	padding: 0 ${vw(5)}px;
`;
export const OptionsContainer = styled.ScrollView`
	padding: 0 ${vw(6)}px;
	margin-top:${vh(3)}px;
`;
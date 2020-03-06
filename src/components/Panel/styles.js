import { Text } from 'react-native-elements';
import { vh, vw } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

export const ModalContainer = styled.View`
	flex:1;
	background-color: #fff;
	border-top-left-radius: 30px;
	border-bottom-left-radius: 30px;
	overflow: hidden;
`;

export const ModalHeader = styled.View`
	border-top-width: 4px;
	border-top-color: ${({ theme })=>theme.palette.primary.main};
	flex-direction:row;
	padding: 0 10px;
	height: 60px;
	align-items:center;
	justify-content:flex-start;
`;

export const ModalContent = styled.ScrollView`
	
`;

export const ModalClose = styled.View`
	margin-right:10px;
`;

export const HeaderRightContainer = styled.View`
	flex-direction: row;
	margin-left:auto;
	align-items:center;
`;
export const ModalBadgeContainer = styled.View`
	align-items:center;
	justify-content:center;
`;

export const ModalConfirm = styled.View`
	margin-left:10px;
`;
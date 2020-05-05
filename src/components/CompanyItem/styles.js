import { Platform } from 'react-native';

import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
	border-radius: 30px;
	background-color: #fff;
	margin: 5px 0;
	overflow: hidden;
	flex-direction: row;
	elevation: 5;
	
	${()=>Platform.OS === 'ios' && 'border: 1px solid #f0f0f0'}
	
`;

export const ContentContainer = styled.View`
	margin: 0 20px;
	flex: 1;
	justify-content: center;
`;

export const FooterContainer = styled.View`
	flex-direction: row;
	margin-top: 5px;
	margin-left: -3px;
	align-items: center;
`;
export const FooterContent = styled.View`
	flex-direction: row;
	align-items: center;
	margin-right: 5px;
`;

import styled from 'styled-components/native';
import { Text } from 'react-native-elements';
import { vw } from 'react-native-expo-viewport-units';

export const Container = styled.View`
	
`;

export const BlocksRow = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: ${vw(5)}px;
`;

export const Block = styled.View`
	background-color: #fff;
	border-radius: 4px;
	padding: 15px;
	width: 47%;
	height: 125px;
	justify-content: space-between;
`;

export const BlockIcon = styled.View`
	
`;
export const BlockHeader = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;
export const BlockTitle = styled(Text)`
	font-size: 13px;
	color: #aaa;
`;
export const BlockInfo = styled(Text)`
	color: #222;
	text-align: right;
`;
export const BlockFooter = styled.View`
`;
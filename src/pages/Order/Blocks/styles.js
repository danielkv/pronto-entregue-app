import { Text } from 'react-native-elements';
import { vw } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

import { Typography } from '../../../react-native-ui';

export const Container = styled.View`
	margin: 15px 35px;
`;

export const BlocksRow = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: ${vw(5)}px;
`;

export const Block = styled.View`
	background-color: #fff;
	border-radius: 15px;
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
	font-size: 15px;
	color: #aaa;
`;
export const BlockInfo = styled(Typography)`
	font-size: 18px;
	font-weight: bold;
	color: #333;
	text-align: right;
`;
export const BlockFooter = styled.View`
`;
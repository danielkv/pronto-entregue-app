import styled from 'styled-components/native';

import { Typography } from '../../../react-native-ui';

export const Block = styled.View`
	background-color: ${({ color })=>color === 'dark' ? '#D1C6B1' : '#fff'};
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
export const BlockTitle = styled(Typography)`
	font-size: 12px;
	color: ${({ color })=>color === 'dark' ? '#fff' : '#aaa'};
`;
export const BlockInfo = styled(Typography)`
	font-size: 18px;
	font-family: 'Roboto-Bold';
	color: #333;
	text-align: right;
`;
export const BlockFooter = styled.View`
`;
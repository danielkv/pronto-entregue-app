import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

import { Typography } from '../../react-native-ui';

export const Block = styled(RectButton)`
	flex: 1;
	background-color: white;
	border-radius: 20px;
	height: 150px;
	margin: 0 10px;
	justify-content: space-around;
	align-items: flex-end;
	padding-right: 20px;
`;
export const BlockText = styled(Typography)`
	font-family: 'Roboto-Bold';
	text-transform: uppercase;
	font-size: 16px;
	text-align: right;
`;

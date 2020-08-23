import { vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

import { Typography } from '../../react-native-ui';

export const BigHeader = styled.View`
	background-color: ${({ theme }) => theme.palette.primary.main};
	border-bottom-left-radius: 30px ;
	border-bottom-right-radius: 30px ;
	height: ${vh(30)}px;
	
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding-right: 35px;
	margin-bottom: 10px;
	position: relative;
	overflow: hidden;
`;
export const BigHeaderImage = styled.Image`
	max-height: 100%;
	width: 65%;
	resize-mode: contain;
	position: absolute;
	left: -15px;
	opacity: .3;
`;
export const BigHeaderTitle = styled(Typography)`
	font-family: 'Roboto-Bold';
	font-size: 24px;
	color: white;
`;
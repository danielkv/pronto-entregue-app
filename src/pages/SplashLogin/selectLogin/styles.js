import { TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { Typography } from '../../../react-native-ui';

export const ButtonContainer = styled(TouchableOpacity)`
	background-color: #fff;
	border-radius: 30px;
	flex: .333;
	align-items: flex-end;
	justify-content: center;
	padding-right: 35px;
	margin-bottom: 10px;
	elevation:20;
	position: relative;
	overflow: hidden;
`;
export const ButtonImage = styled.Image`
	max-height: 100%;
	width: 65%;
	resize-mode: contain;
	position: absolute;
	left: -15px;
`;
export const ButtonTitle = styled(Typography)`
	font-size: 13px;
`;
export const ButtonSubtitle = styled(Typography)`
	font-family: 'Roboto-Bold';
	margin-top: 5px;
	text-align: right;
	font-size: 20px;
	width: 140px;
	text-transform: uppercase;
`;
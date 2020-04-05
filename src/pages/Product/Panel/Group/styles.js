import { Platform } from 'react-native';

import styled from 'styled-components/native';

import { Typography } from '../../../../react-native-ui';


export const Container = styled.TouchableOpacity`
	background-color:#fff;
	elevation: 6;
	
	padding-left: 15px;
	margin: 8px 0;
	height: 44px;

	border-radius:25px;
	flex-direction:row;
	align-items:center;
	overflow:hidden;

	${()=>Platform.OS === 'ios' && 'border: 1px solid #f0f0f0'}
`;

export const TitleContainer = styled.View`
	flex-direction:row;
	align-items:center;
	flex:1;
`;

export const CenterElementContainer = styled.View`
	flex:1;
	flex-direction:row;
	align-items:center;
	justify-content:flex-end;
`;


export const SelectedOptionsNumber = styled.View`
	background-color:${({ theme })=>theme.palette.primary.main};
	border-radius:30px;
	width:30px;
	height:30px;
	justify-content:center;
	align-items:center;
	margin-right: 10px;
`;
export const SelectedOptionsNumberText = styled(Typography)`
	font-size:14px;
	line-height:30px;
	text-align:center;
	font-weight:bold;
	color:#fff;
`;
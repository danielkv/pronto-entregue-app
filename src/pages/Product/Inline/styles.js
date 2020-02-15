import { Text } from 'react-native-elements';
import { vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

import theme from '../../../theme';

export const Container = styled.View`
	
`;

export const GroupContainer = styled.View`
	border-style:dashed;
	border-top-width:2px;
	border-top-color: ${theme.palette.divider};

	margin:10px 0 5px 0;
`;
export const GroupTitle = styled(Text)`
	font-size:13px;
	text-align:left;
	font-weight:100;
	color : #fff;
	margin-top:${vh(2)}px;
	margin-bottom:${vh(1)}px;
`;
export const OptionsContainer = styled.View`
	
`;
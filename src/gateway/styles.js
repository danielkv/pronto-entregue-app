import { Text } from 'react-native-elements';
import { vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

import theme from '../theme';

export const GataweyContainer = styled.TouchableOpacity`
	background-color: ${theme.palette.divider};
	padding: 20px;
	margin: ${vh(2)}px 0;
	border-radius: 4px;

	flex-direction: row;
`;

export const GetawayTitle = styled(Text)`
	color: #fff;
	font-weight: 100;
	font-size: 16px;
	margin-left: 10px;
`;

export const GetawayIconContainer = styled.View`
	
`;
export const LabelText = styled(Text)`
	color: #fff;
	margin-top: 15px;
	padding: 0 7px;
`;
import { Text } from 'react-native-elements';
import { vh } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

export const TakeoutContainer = styled.TouchableOpacity`
	background-color: #fff;
	padding: 20px;
	margin: ${vh(2)}px 0;
	border-radius:4px;
`;
export const TakeoutTitle = styled(Text)`
	font-size:20px;
	font-weight:bold;
	color: ${({ theme })=>theme.palette.divider};
`;

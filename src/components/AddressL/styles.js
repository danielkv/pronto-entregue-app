import styled from 'styled-components/native';
import { vh } from 'react-native-expo-viewport-units';
import { Text } from 'react-native-elements';

import theme from '../../theme';

export const Container = styled.TouchableOpacity`
	background-color: ${theme.colors.divider};
	padding: 20px;
	margin: ${vh(2)}px 0;
	border-radius:4px;
`;
export const Title = styled(Text)`
	font-size:18px;
	font-weight:bold;
	color:#fff;
	margin-bottom:5px;
`;
export const AddressInfo = styled(Text)`
	font-size:14px;
	font-weight:100;
	color:#fff;
`;

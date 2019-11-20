import styled from 'styled-components/native';
import { Text } from 'react-native-elements';

export const BlockContainer = styled.View`
	flex:1;
	justify-content:center;
	align-items:center;
`;

export const BlockMessage = styled(Text)`
	text-align:center;
	color: #fff;
	font-size: 18px;
	font-weight:bold;
`;
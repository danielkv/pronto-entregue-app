import styled from 'styled-components/native';

import { Typography } from '../../react-native-ui';

export const BlockContainer = styled.View`
	flex:1;
	justify-content:center;
	align-items:center;
`;

export const BlockMessage = styled(Typography)`
	text-align:center;
	color: #fff;
	font-size: 18px;
	font-weight:bold;
`;
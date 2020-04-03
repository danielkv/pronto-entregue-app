import styled from 'styled-components/native';

import { Typography } from '../../react-native-ui';

export const ErrorContainer = styled.View`
	flex: 1;
	justify-content:center;
	align-items:center;
`;
export const ErrorIconContainer = styled.View`
	
`;
export const ErrorTitle = styled(Typography)`
	color: #c00;
	font-weight:bold;
	font-size:16px;
	text-align:center;
`;
export const ErrorMessage = styled(Typography)`
	color: #c00;
	font-weight:normal;
	font-size:14px;
	text-align:center;
`;

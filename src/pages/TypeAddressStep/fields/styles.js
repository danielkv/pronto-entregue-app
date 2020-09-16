
import { TextInput, RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

import { Typography, Button } from '../../../react-native-ui';

export const FieldContainer = styled.ScrollView.attrs({ contentContainerStyle: { margin: 0, paddingHorizontal: 10, paddingTop: 15, flexGrow: 1 } })`
	
`;

export const FieldPanel = styled(RectButton)`
	flex: 1;
	background-color: white;
	border-radius: 30px;
	padding: 30px;
	justify-content: space-between;
`;
export const FieldWrapper = styled.View`
	margin-bottom: 35px;
`;
export const HelperWrapper = styled.View`
	margin-right: 55px;
`;

export const FieldLabel = styled(Typography)`
	font-size: 16px;
	margin-bottom: 6px;
	text-transform: uppercase;
	color: ${({ theme }) => theme.palette.background.dark};
`;

export const Field = styled.View`
	margin-bottom: 15px;
`;
export const FieldInput = styled(TextInput).attrs({ returnKeyType: 'next' })`
	font-size: 20px;
	padding: 8px 3px;
	color: #333;
	/* background-color: rgba(0,0,0,0.03) */
`;

export const FieldHelper = styled(Typography)`
	font-size: 12px;
	margin-bottom: 15px;
	color: #999;
`;

export const FieldDescription = styled(Typography)`
	color: #999;
`;

export const FieldButton = styled(Button)`
	
`;
export const FieldFooter = styled.View`
	margin-top:15px;
	flex-direction: row;
	justify-content: space-evenly;
	position: absolute;
	bottom: -35px;
	right: 20px;
`;
export const Line = styled(Typography)`
	margin-top:3px;
	font-size: 18px
`;
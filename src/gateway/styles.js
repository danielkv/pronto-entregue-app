import { Text } from 'react-native-elements';

import styled from 'styled-components/native';

export const GataweyContainer = styled.TouchableOpacity`
	background-color: #fff;
	padding: 15px 20px;
	margin: 7px 0;
	border-radius: 15px;

	flex-direction: row;
	align-items:center;
	${()=>'shadow-color: #000;	shadow-offset: 0 2px;	shadow-opacity: 0.23;	shadow-radius: 2.62px;	elevation:4;'}
`;

export const GetawayIconContainer = styled.View`
	
`;
export const LabelText = styled(Text)`
	color: #fff;
	margin-top: 15px;
	padding: 0 7px;
`;
import styled from 'styled-components/native';
import { Text } from 'react-native-elements';
import { vw, vh } from 'react-native-expo-viewport-units';

import theme from '../../theme';

export const ContainerScroll = styled.ScrollView`
	
`;
export const Container = styled.View`
	margin: ${theme.header.height}px ${vw(3)}px 0 ${vw(3)}px;
`;
export const UserHeader = styled.View`
	padding: ${vh(5)}px ${vw(8)}px;
	align-items: center;
`;
export const UserName = styled(Text)`
	margin-top: 35px;
	color: #fff;
`;
export const UserEmail = styled(Text)`
	color: #fff;
`;
export const ContentContainer = styled.View`
	border-top-width: 4px;
	border-top-color: ${theme.colors.divider};
	padding: ${vh(5)}px ${vw(8)}px;
`;

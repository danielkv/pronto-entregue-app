import styled from 'styled-components/native';

import { Typography } from '../../../react-native-ui';

export const Container = styled.View`
	margin: ${({ theme })=>(`${theme.margin.top}px ${theme.margin.left}px`)};
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
export const UserNameContainer = styled.View`
  
`;
export const UserLocationContainer = styled.View`
	align-items: flex-end;
`;
export const UserName = styled(Typography)`
	color:  ${({ theme })=>theme.palette.background.dark}
`;

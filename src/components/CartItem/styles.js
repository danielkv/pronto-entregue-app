
import styled from 'styled-components/native';

import { Typography } from '../../react-native-ui';

export const Container = styled.View`
	margin-bottom: 14px;
	flex-direction: row;
`;

export const ItemContent = styled.View`
	flex: 1;
	margin-left: 12px;
`;
export const ItemFooter = styled.View`
	flex-direction: row;
	align-items: center;
	margin-top:10px;
`;

export const ItemMessage = styled(Typography)`
	font-weight: 100;
	font-size: 13px;
	margin-bottom: 8px;
`;
export const ItemOptionsContainer = styled.View`
	margin-bottom: 8px;
`;

export const HeaderContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

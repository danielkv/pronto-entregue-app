import { vw } from 'react-native-expo-viewport-units';

import styled from 'styled-components/native';

export const ItemsContainer = styled.View`
	width: ${vw(100)}px;
	justify-content: flex-start;
	flex-wrap: wrap;
	flex-direction:row;
	margin: 0 -17.5px;
`;

import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

const BlockContainer = styled.View`
	flex:1;
	justify-content:center;
	align-items:center;
`;

export default function LoadingBlock () {
	return (
		<BlockContainer>
			<ActivityIndicator color="#B95A02" size={24} />
		</BlockContainer>
	)
}
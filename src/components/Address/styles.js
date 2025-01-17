import styled from 'styled-components/native';

export const Container = styled.View`
	flex-direction: row;
	margin: 10px 0;
`;
export const IconBlock = styled.View`
	width: 60px;
	height: 60px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme })=> theme.palette.background.main};
	border-radius: 15px;
	margin-right: 20px;
`;
export const TextBlock = styled.View`
	flex: 1;
`;

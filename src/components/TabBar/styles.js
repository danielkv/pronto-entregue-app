import styled from 'styled-components/native';

export const Container = styled.View`
	background-color: ${({ theme })=> theme.palette.background.main};
	height: 60px;
	flex-direction: row;
	align-items: center;
	justify-content:space-around;
	padding: 0 15px;

	shadow-color: #000000;
	shadow-offset: 0 -5px;
	
	shadow-opacity: 0.25;

	elevation: 15;
`;

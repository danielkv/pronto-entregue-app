import styled from 'styled-components/native';

export const PointerContainer = styled.View`
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -36px;
	margin-top:-58px;
	align-items: center;
	flex-direction:column-reverse;
	z-index: 0;
`;

export const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`
export const PinShadow = styled.View`
	background-color: rgba(0,0,0,0.3);
	width: 20px;
	border-radius: 100px;
	height: 20px;
	margin-top: -15px;
	z-index: 0;
	transform: scaleY(.5)
`;

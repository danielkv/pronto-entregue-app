import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
	border-radius: 15px;
	background-color: #fff;
	margin: 15px 0;
	overflow: hidden;
	flex-direction: row;
	${'shadow-color: #000; shadow-offset: 0 2px; shadow-opacity: 0.25; shadow-radius: 3.84px; elevation: 5;'}
`;

export const ContentContainer = styled.View`
	margin: 0 20px;
	flex: 1;
	justify-content: center;
`;

export const Stars = styled.View`
	flex-direction: row;
	margin-top: 4px;
`;
export const FooterContainer = styled.View`
	flex-direction: row;
	margin-top: 12px;
	margin-left: -3px;
	align-items: center;
`;
export const FooterContent = styled.View`
	flex-direction: row;
	align-items: center;
	margin-right: 5px;
`;

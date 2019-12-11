import styled from 'styled-components/native';
import { vh } from 'react-native-expo-viewport-units';
import { Text } from 'react-native-elements';
import theme from '../../theme';

export const Container = styled.View`
	background-color: ${theme.colors.divider};
	border-radius: 6;
	padding: 20px;
	margin-bottom: ${vh(2)}px;
	
	${()=>'shadow-color: #000;	shadow-offset: 0 2px;	shadow-opacity: 0.23;	shadow-radius: 2.62px;	elevation:4;'}
`;
export const ButtonsContainer = styled.View`
	flex-direction: row;
	position: absolute;
	right: 10px;
	top: 10px;
`;
export const ItemContent = styled.View`
  
`;
export const ItemFooter = styled.View`
	flex-direction: row;
	align-items: baseline;
	justify-content: space-between;
	margin-top:10px;
`;
export const ItemTitle = styled(Text)`
	color: #fff;
	font-weight: bold;
	font-size: 18px;
	margin-bottom: 8px;
`;
export const ItemMessage = styled(Text)`
	font-weight: 100;
	font-size: 13px;
	margin-bottom: 8px;
`;
export const ItemOptionsContainer = styled.View`
	margin-bottom: 8px;
`;
export const ItemOptionTitle = styled(Text)`
	color: #fff;
	font-weight: bold;
	font-size: 14px;
`;
export const ItemOptionDesc = styled(Text)`
	color: #fff;
	font-weight: 100;
	font-size: 13px;
	margin-bottom: 8px;
`;
export const ItemQuantity = styled(Text)`
	color: #fff;
	font-weight: 100;
	font-size: 12px;
`;
export const ItemPriceContainer = styled.View`
	background-color: #fff;
	border-radius: 3px;
	padding: 4px 7px;
`;
export const ItemPrice = styled(Text)`
	font-size: 12px;
	color: ${theme.colors.divider};
`;

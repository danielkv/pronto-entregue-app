import styled from 'styled-components/native';
import { Text } from 'react-native-elements';
import { vh, vw } from 'react-native-expo-viewport-units';
import theme from '../../../theme';

export const TitleContainer = styled.View`
	flex-direction:row;
	align-items:center;
	flex:1;
`;
export const OptionIconContainer = styled.View`
	margin-right:${vw(3)}px;
`;
export const OptionTitle = styled(Text)`
	
`;
export const PriceContainer = styled.View`
	background-color: #000;
	padding:4px 10px;
	border-radius:3px;
	align-items:center;
	justify-content:center;
`;
export const OptionPrice = styled(Text)`

`;

export const Container = styled.TouchableOpacity`
	${({ selected })=>(selected ? 'background-color: #fff;' : `background-color: ${theme.colors.divider}`)}
	${({ selected })=>(selected && 'shadow-color: #000;	shadow-offset: 0 2px;	shadow-opacity: 0.23;	shadow-radius: 2.62px;	elevation:4;')}
	
	padding: 0 ${vw(5)}px;
	margin:${vh(1)}px 0;
	height: ${vh(7)}px;

	border-radius:4px;
	flex-direction:row;
	align-items:center;
	overflow:hidden;
`;
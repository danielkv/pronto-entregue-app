import styled from 'styled-components/native';
import {Text} from 'react-native-elements';
import { vh, vw } from 'react-native-expo-viewport-units';
import theme from '../../../../theme';


export const TitleContainer = styled.View`
	flex-direction:row;
	align-items:center;
	flex:1;
`;

export const GroupTitle = styled(Text)`
	color:#000;
	font-size:18px;
	font-weight:bold;
`;
export const CenterElementContainer = styled.View`
	flex:1;
	flex-direction:row;
	align-items:center;
	justify-content:flex-end;
`;
export const PriceContainer = styled.View`
	background-color: #000;
	padding:4px 10px;
	border-radius:3px;
	align-items:center;
	justify-content:center;
	margin-left:${vw(3)}px;
`;
export const GroupPrice = styled(Text)`
	font-size:14px;
	color:#fff;
`;

export const Container = styled.TouchableOpacity`
	background-color:#fff;
	${()=>'shadow-color: #000;	shadow-offset: 0 2px;	shadow-opacity: 0.23;	shadow-radius: 2.62px;	elevation:4;'}
	
	padding: 0 ${vw(5)}px;
	margin:${vh(1)}px 0;
	height: ${vh(7)}px;

	border-radius:4px;
	flex-direction:row;
	align-items:center;
	overflow:hidden;
`;

export const SelectedOptionsText = styled(Text)`
	font-size:13px;
	color:#999;
`;

export const SelectedOptionsNumber = styled(Text)`
	font-size:14px;
	background-color:${theme.colors.primary};
	border-radius:30px;
	width:30px;
	height:30px;
	line-height:30px;
	text-align:center;
	font-weight:bold;
	justify-content:center;
	align-items:center;
	color:#fff;
`;
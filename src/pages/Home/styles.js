import styled from 'styled-components/native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { Text } from 'react-native-elements';
import theme from '../../theme';

export const Container = styled.ScrollView`
	background-color:${theme.colors.primary};
`;

export const ImageLogo = styled.Image`

`;

export const Footer = styled.View`
	align-items:center;
	margin:${vh(5)}px 0;
`;

export const HeaderContainer = styled.TouchableOpacity`
	height:${vh(40)}px;
`;
export const CategoriesContainer = styled.View`
	padding:${vh(2)}px;
`;
export const CategoriesTitle = styled(Text)`
	text-align:center;
`;

export const Categories = styled.View`
`;

export const Category = styled.TouchableOpacity`
	flex:1;
	align-items:center;
	padding:${vw(5)}px;
`;

export const CategoryImage = styled.Image`
	width:100px;
	height:100px;
	
	border-radius:50px;
`;

export const CategoryTitleContainer = styled.View`
	color:#fff;
	text-align: center;
	font-weight:100;
	margin-top:8px;
	
	padding:3px 13px;
	background-color:#000;
	border-radius:20px;
`;
export const CategoryTitle = styled(Text)`
	color:#fff;
	text-align: center;
	font-weight:100;
`;
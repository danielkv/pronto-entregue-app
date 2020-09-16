import React from 'react';
import { IconButton } from '../../react-native-ui';

// import { Container } from './styles';

function SearchButton({ navigation, iconsColor = '#655A51' }) {
	return <IconButton onPress={() => navigation.navigate('SearchScreen')} icon={{ name: 'search', color: iconsColor }} />;
}

export default SearchButton;
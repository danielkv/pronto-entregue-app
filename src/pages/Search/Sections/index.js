import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';

import ErrorBlock from '../../../components/ErrorBlock';
import SectionItem from '../../../components/SectionItem';

import { useSelectedAddress } from '../../../controller/hooks';
import { Typography, useTheme } from '../../../react-native-ui';
import { getErrorMessage } from '../../../utils/errors';
import { ItemsContainer } from './styles';

import { GET_SECTIONS } from '../../../graphql/sections';

export default function Sections() {
	const navigation = useNavigation();
	const { palette } = useTheme();
	const { location } = useSelectedAddress();
	const { data: { sections = [] } = {}, loading: loadingSections, error } = useQuery(GET_SECTIONS, { variables: { limit: 8, location } });
	
	if (error) return <ErrorBlock error={getErrorMessage(error)} />

	return (
		<View>
			<Typography variant='h1' style={{ marginVertical: 20, fontSize: 26 }}>Seções</Typography>
			
			{loadingSections
				? <ActivityIndicator color={palette.primary.main} />
				: sections.length
					? (
						<ItemsContainer>
							{sections.map((item) => <SectionItem key={item.id} onPress={()=>navigation.navigate('SectionCompaniesScreen', { sectionId: item.id, sectionName: item.name, sectionImage: item.image })} section={item} />)}
						</ItemsContainer>
					)
					: <Typography variant='subtitle'>Nenhuma seção encontrada para entrega nesse local</Typography>
			}
		</View>
	);
}

import React from 'react';
import { View, FlatList } from 'react-native';

import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/core';

import SectionItem from '../../../components/SectionItem';

import { useSelectedAddress } from '../../../controller/hooks';

import { GET_SECTIONS } from '../../../graphql/sections';


export default function Sections() {
	const { location } = useSelectedAddress();
	const navigation = useNavigation();
	const { data: { sections = [] } = {}, loading: loadingSections, error } = useQuery(GET_SECTIONS, { variables: { limit: 8, location } });
	
	if (loadingSections || error) return false;

	return (
		<View>
			<FlatList
				data={sections}
				renderItem={({ item }) => {
					const params = {
						sectionId: item.id,
						sectionName: item.name,
						sectionImage: item.image
					}
					return <SectionItem dense section={item} onPress={()=>navigation.navigate('SectionCompaniesScreen', params)} item />
				}}
				horizontal
			/>
		</View>
	);
}
import React from 'react';
import { View, ActivityIndicator, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useQuery } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

import CompanyItem from '../../components/CompanyItem';
import ErrorBlock from '../../components/ErrorBlock';
import NoResultBlock from '../../components/NoResultBlock';

import { useSelectedAddress } from '../../controller/hooks';
import { Paper, Typography, useTheme } from '../../react-native-ui';
import { getErrorMessage } from '../../utils/errors';

import { LOAD_SECTION } from '../../graphql/sections';

// import { Container } from './styles';

export default function Section() {
	const { palette } = useTheme();
	const { params: { sectionId, sectionName, sectionImage } } = useRoute();
	const { location } = useSelectedAddress();
	
	// QUERY
	const { data: { section = null } = {}, loading: loadingSection, error: sectionError } = useQuery(LOAD_SECTION, { variables: { id: sectionId, location } });

	if (sectionError) return <ErrorBlock error={getErrorMessage(sectionError)} />

	return (
		<ScrollView>
			<Paper style={{ overflow: 'hidden' }}>
				<View style={{ marginTop: -35, marginHorizontal: -35, marginBottom: 35 }}>
					<ImageBackground style={{ width: '100%', height: 130 }} source={{ uri: sectionImage }}>
						<LinearGradient
							colors={['#000f', '#0006']}
							style={{ alignItems: "center", justifyContent: 'center', flex: 1 }}
						>
							<Typography variant='title' style={{
								color: '#fff',
								fontSize: 24,
								textTransform: 'uppercase',
								letterSpacing: 5,
								textShadowColor: 'rgba(0, 0, 0, 0.75)',
								textShadowOffset: { width: -1, height: 1 },
								textShadowRadius: 10
							}}>{sectionName}</Typography>
						</LinearGradient>
					</ImageBackground>
				</View>
				{loadingSection
					? <ActivityIndicator color={palette.primary.main} />
					: section?.companies
						? (
							section.companies.map(company => <CompanyItem key={company.id} item={company} />)
						)
						: <NoResultBlock />
				}
			</Paper>
		</ScrollView>
	);
}

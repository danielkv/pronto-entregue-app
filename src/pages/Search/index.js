import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import UserLocation from '../../components/UserLocation';

import { Paper } from '../../react-native-ui';
import SearchBlock from './SearchBlock';
import Sections from './Sections';

export default function Home() {
	return (
		<ScrollView keyboardShouldPersistTaps='handled'>
			<Paper>
				<UserLocation />

				<SearchBlock />
				<Sections />
			</Paper>
		</ScrollView>
	);
}

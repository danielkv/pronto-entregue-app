import React from 'react';
import { View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { useInitialize } from './services/init';
import SelectBranch from './pages/SelectBranch';
import RootScreen from './routes';
import LoadingBlock from './components/LoadingBlock';

export default function RootRoutes() {
	const { loading, selectedBranch } = useInitialize();
	const insets = useSafeArea();
	
	return (
		<View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
			<NavigationContainer>
				{
					// eslint-disable-next-line no-nested-ternary
					loading
						? <LoadingBlock />
						: !selectedBranch ? <SelectBranch /> : <RootScreen />
				}
			</NavigationContainer>
		</View>
	);
}
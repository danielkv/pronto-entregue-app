import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context';

import 'moment/locale/pt-br';

import { NavigationContainer } from '@react-navigation/native';

import ConnectionInfoPanel from './components/ConnectionInfoPanel';
import FontLoader from './components/FontLoader';
import LoadingBlock from './components/LoadingBlock';

import AuthenticationRoutes from './routes/authentication';
import MainRoutes from './routes/main';
import { useInitialize } from './services/init';
import NavigatorTheme from './theme/navigator';

export default function SplashScreen() {
	const { loading, loggedUserId } = useInitialize();
	const insets = useSafeArea();

	//const keyboardVerticalOffset = 70 + (insets?.top || 0);

	return (
		<View style={{ flex: 1, paddingBottom: insets.bottom }}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>

				<FontLoader>
					<NavigationContainer theme={NavigatorTheme}>
						{
							// eslint-disable-next-line no-nested-ternary
							loading
								? <LoadingBlock />
								: !loggedUserId
									? <AuthenticationRoutes />
									: <MainRoutes />
						}
					</NavigationContainer>
				</FontLoader>
				<ConnectionInfoPanel />
			</KeyboardAvoidingView>

		</View>
	);
}
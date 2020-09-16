import { AsyncStorage } from 'react-native';

import { registerForPushNotifications } from '../../controller/notification';
import client from '../../services/apolloClient';

export default async function logUserIn(user, token) {
	await AsyncStorage.setItem('@prontoEntregue/userToken', token);
	await registerForPushNotifications(user.id);
	client.writeData({ data: { userToken: token, loggedUserId: user.id } });
}
import { AsyncStorage } from "react-native";

import { removeForPushNotifications } from "../../controller/notification";
import client from "../../services/apolloClient";

export default async function logUserOut() {
	await removeForPushNotifications();
	await AsyncStorage.removeItem('@prontoEntregue/userToken');
	client.writeData({ data: { userToken: '', loggedUserId: null } });
}
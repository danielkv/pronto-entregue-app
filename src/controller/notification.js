import { Alert } from 'react-native';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import client from '../services/server';

import { PUSH_NOTIFICATION_TOKEN, REMOVE_NOTIFICATION_TOKEN } from '../graphql/users';

export function handleNotificationListener(notification, navigation) {
	const { data } = notification;
	
	if (notification.origin === 'selected') {
		if (data.redirect) {
			const { name: routeName, params } = data.redirect;
			navigation.navigate(routeName, params);
		}
	} else {
		if (data.alertData) {
			const buttons = [{ text: 'OK', style: 'cancel' }]
			if (data.redirect) {
				const { name: routeName, params } = data.redirect;
				buttons.push({ text: 'Abrir', onPress: () => navigation.navigate(routeName, params) })
			}
			Alert.alert(
				data.alertData.title,
				data.alertData.body,
				buttons
			);
		}
	}
}
	
export async function registerForPushNotifications(userId) {
	const { status: existingStatus } = await Permissions.getAsync(
		Permissions.NOTIFICATIONS
	);
	let finalStatus = existingStatus;
			
	// only ask if permissions have not already been determined, because
	// iOS won't necessarily prompt the user a second time.
	if (existingStatus !== 'granted') {
		// Android remote notification permissions are granted during the app
		// install, so this will only ask on iOS
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		finalStatus = status;
	}
			
	// Stop here if the user did not grant permissions
	if (finalStatus !== 'granted') return;
			
	// Get the token that uniquely identifies this device
	const token = await Notifications.getExpoPushTokenAsync();
			
	// POST the token to your backend server from where you can retrieve it to send push notifications.
	await client.mutate({ mutation: PUSH_NOTIFICATION_TOKEN, variables: { userId, token } });
			
	return true;
}
		
export async function removeForPushNotifications() {
	// Get the token that uniquely identifies this device
	const token = await Notifications.getExpoPushTokenAsync();
			
	// POST the token to your backend server from where you can retrieve it to send push notifications.
	await client.mutate({ mutation: REMOVE_NOTIFICATION_TOKEN, variables: { token } });
			
	return true;
}
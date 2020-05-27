import { Alert, Platform } from 'react-native';

import { Notifications } from 'expo';
import * as Device from 'expo-device';
import * as Permissions from 'expo-permissions';

import client from '../services/apolloClient';

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
			const buttons = [];
			
			if (data.redirect) {
				const { name: routeName, params } = data.redirect;
				buttons.push({ text: 'Abrir', onPress: () => navigation.navigate(routeName, params) })
			} else {
				if (!data.redirect.force)
					buttons.unshift({ text: 'OK', style: 'cancel' })
			}
			Alert.alert(
				data.alertData.title,
				data.alertData.body,
				buttons,
				{ cancelable: data.redirect.force || false }
			);
		}
	}
}
	
export async function registerForPushNotifications(userId) {
	/// if is running on simulator
	if (!Device.isDevice) return;

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

	if (Platform.OS === 'android') {
		Notifications.createChannelAndroidAsync('Standard', {
			name: 'Notificações',
			sound: true,
			priority: 'max',
			vibrate: [0, 250, 250, 250],
		});
	}
			
	return true;
}
		
export async function removeForPushNotifications() {
	if (!Device.isDevice) return;
	// Get the token that uniquely identifies this device
	const token = await Notifications.getExpoPushTokenAsync();
			
	// POST the token to your backend server from where you can retrieve it to send push notifications.
	await client.mutate({ mutation: REMOVE_NOTIFICATION_TOKEN, variables: { token } });
			
	return true;
}
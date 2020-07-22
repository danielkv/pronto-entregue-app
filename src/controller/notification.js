import { Alert, Platform } from 'react-native';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import client from '../services/apolloClient';

import { PUSH_NOTIFICATION_TOKEN, REMOVE_NOTIFICATION_TOKEN } from '../graphql/users';

export function receiveNotificationHandler (notification, navigation) {
	const { data } = notification.request.content;

	if (data.redirect) {
		const { name: routeName, params } = data.redirect;
		navigation.navigate(routeName, params);
	}

	const alertOn = data.alertOn || ['received'];
	if (data.alertData && alertOn.includes('received')) {
		notificationAlert({ ...data.alertData, redirect: data.redirect }, navigation)
	}
}

export function responseReceiveNotificationHandler(notificationResponse, navigation) {
	const { notification } = notificationResponse;
	const { data } = notification.request.content;

	// alert on [received | selected]
	const alertOn = data.alertOn || ['received'];
	if (data.alertData && alertOn.includes('selected')) {
		notificationAlert({ ...data.alertData, redirect: data.redirect }, navigation)
	}
}

function notificationAlert(data, navigation) {
	const { cancelable = true, title, body, redirect, openButtonText='Abrir' } = data;
	const buttons = [];
			
	if (redirect) {
		const { name: routeName, params } = redirect;
		buttons.push({ text: openButtonText, onPress: () => navigation.navigate(routeName, params) })
	} else {
		if (cancelable !== false)
			buttons.unshift({ text: 'OK', style: 'cancel' })
	}

	Alert.alert(
		title,
		body,
		buttons,
		{ cancelable }
	);
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
	const token = (await Notifications.getExpoPushTokenAsync()).data;
			
	// POST the token to your backend server from where you can retrieve it to send push notifications.
	await client.mutate({ mutation: PUSH_NOTIFICATION_TOKEN, variables: { userId, token } });

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('Standard', {
			name: 'Notificações',
			sound: true,
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250]
		});
	}
			
	return true;
}
		
export async function removeForPushNotifications() {
	if (!Device.isDevice) return;
	// Get the token that uniquely identifies this device
	const token = (await Notifications.getExpoPushTokenAsync()).data;
			
	// POST the token to your backend server from where you can retrieve it to send push notifications.
	await client.mutate({ mutation: REMOVE_NOTIFICATION_TOKEN, variables: { token } });
			
	return true;
}
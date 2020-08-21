import React, { useState } from 'react';
import { Image, Alert } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import * as Google from 'expo-google-app-auth';

import LoadingBlock from '../../../components/LoadingBlock';

import imageGoogle from '../../../assets/images/google_icon.png';
import logUserIn from '../../../helpers/auth/logUserIn';
import { Button, Typography } from '../../../react-native-ui';
import { getErrorMessage } from '../../../utils/errors';

import { SOCIAL_LOGIN } from '../../../graphql/authentication';

export default function GoogleButtton({ disabled, afterLogin }) {
	const [loading, setLoading] = useState(false);

	const [socialLogin] = useMutation(SOCIAL_LOGIN)

	async function signIn() {
		setLoading(true)
		
		try {
			const result = await Google.logInAsync({
				androidClientId: "48328149169-31fusqf9oag07hb23akrfbhje89n04kd.apps.googleusercontent.com",
				iosClientId: '48328149169-an6eotcn0f18rhqjc2ibsdqrcfbbpfkm.apps.googleusercontent.com',
				androidStandaloneAppClientId: '48328149169-np1pgafh4qfmq2n35fm2foc40pmhov0e.apps.googleusercontent.com',
				scopes: ["profile", "email"]
			})
			
			if (result.type === "success") {
				const userData = {
					id: result.user.id,
					firstName: result.user.givenName,
					lastName: result.user.familyName,
					email: result.user.email,
					image: result.user.photoUrl
				}
				await socialLogin({ variables: { type: 'google', data: userData } })
					.then(async ({ data: { socialLogin: { token, user } } }) => {
						await logUserIn(user, token);
						afterLogin();
					})
			}
		} catch (err) {
			Alert.alert('Ops, parece que houve um erro', getErrorMessage( err))
		}
		
		setLoading(false);
	}
	
	return (
		<Button
			variant='filled'
			disabled={disabled || loading}
			onPress={signIn}
		>
			{loading
				? <LoadingBlock />
				: (
					<>
						<Image source={imageGoogle} style={{ marginRight: 10 }} />
						<Typography variant='button' style={{ color: '#fff' }}>Logar com Google</Typography>
					</>
				)}
		</Button>
	);
}
	
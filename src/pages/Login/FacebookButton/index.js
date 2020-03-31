import React, { useState } from 'react';
import { Image, Alert } from 'react-native';

import { useMutation } from '@apollo/react-hooks';
import * as Facebook from 'expo-facebook';

import LoadingBlock from '../../../components/LoadingBlock';

import imageFB from '../../../assets/images/logo-fb.png';
import { Button, Typography } from '../../../react-native-ui';
import { getErrorMessage } from '../../../utils/errors';

import { SOCIAL_LOGIN } from '../../../graphql/authentication';
import { logUserIn } from '../../../services/init';

export default function FacebookButton({ disabled }) {
	const [loading, setLoading] = useState(false);

	const [socialLogin] = useMutation(SOCIAL_LOGIN);
	
	async function signIn() {
		setLoading(true);
		try {
			await Facebook.initializeAsync('3208271965864018');
			const { type, token } = await Facebook.logInWithReadPermissionsAsync(
				"3208271965864018",
				{ permissions: ["public_profile"] }
			);

			if (type === "success") {
				const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,first_name,last_name,picture.type(large)`);
				const user = await response.json();
				const userData = {
					id: user.id,
					firstName: user.first_name,
					lastName: user.last_name,
					email: user.email,
					image: user.picture.data.url
				}
				await socialLogin({ variables: { type: 'facebook', data: userData } })
					.then(({ data: { socialLogin: { token, user } } })=>{
						logUserIn(user, token);
					})
			}
		} catch (err) {
			Alert.alert('Ops, parece que houve um erro', getErrorMessage(err))
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
						<Image source={imageFB} style={{ marginRight: 10 }} />
						<Typography variant='button' style={{ color: '#fff' }}>Logar com Facebook</Typography>
					</>
				)}
		</Button>
	);
}
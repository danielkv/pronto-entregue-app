import React from 'react';
import { Button, Input } from 'react-native-elements';
import { useFormik } from 'formik';

import logoResource from '../../assets/images/logo-copeiro.png';

import { Container, FormContainer, LogoImage } from './styles';

export default function login({ navigation }) {
	const initialValues = {
		login: '',
		password: '',
	}

	const onSubmit = () => {
		navigation.navigate('SubscriptionScreen');
	}

	// eslint-disable-next-line no-shadow
	const { values: { login, password }, errors, handleSubmit, handleChange, handleBlur } = useFormik({
		initialValues,
		onSubmit,
	});

	return (
		<Container>
			<LogoImage source={logoResource} />
			
			<FormContainer>
				<Input
					error={errors.login}
					placeholder='Login'
					onChangeText={handleChange('login')}
					onBlur={handleBlur('login')}
					value={login}
				/>
				<Input
					error={errors.password}
					secureTextEntry
					placeholder='Senha'
					onChangeText={handleChange('password')}
					onBlur={handleBlur('password')}
					value={password}
				/>
				
				<Button
					type='clear'
					title='Esqueci minha senha'
				/>

				<Button
					size='big'
					onPress={handleSubmit}
					title='Login'
				/>
				<Button
					labelStyle={{ color: '#336535' }}
					size='small'
					onPress={() => navigation.navigate('SubscriptionScreen')}
					title='Quero me cadastrar'
				/>
			</FormContainer>
		</Container>
	);
}

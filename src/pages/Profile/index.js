import React from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { ReactNativeFile } from 'apollo-upload-client';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import LoadingBlock from '../../components/LoadingBlock';

import { Avatar, Paper, Typography, Button, useTheme, IconButton } from '../../react-native-ui';
import { useLoggedUserId } from '../../utils/hooks';
import {
	ContainerScroll,
	UserHeader,
} from './styles';

import { GET_USER, UPDATE_USER_IMAGE } from '../../graphql/users';

export default function Profile({ navigation }) {
	const { palette } = useTheme();
	const loggedUserId = useLoggedUserId()
	const { data: { user }, loading: loadingUser } = useQuery(GET_USER, { variables: { id: loggedUserId } });
	const [updateUserImage, { loading: loadingUpdateUserImage }] = useMutation(UPDATE_USER_IMAGE, { variables: { userId: loggedUserId } });
	
	async function getCameraRollPermission() {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				throw new Error('Você precisa liberar o acesso aos seus arquivos para podermos trocar a imagem do perfil');
			}
		}
	}
	
	async function pickImage() {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			//allowsEditing: true,
			aspect: [1,1],
			quality: 1
		});
		
		if (!result.cancelled) {
			const fileExt = result.uri.substr(-3);
			const image = new ReactNativeFile({
				uri: result.uri,
				type: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`,
				name: user.fullName
			})
			
			await updateUserImage({ variables: { image } })
		}
	}
	
	function handleUserAvatarPress () {
		getCameraRollPermission()
			.then(pickImage)
			.catch((err)=>{
				Alert.alert('Hmm! Houve um pequeno problema', err.message)
			})
	}
	
	if (loadingUser) return <LoadingBlock />
	
	return (
		<ContainerScroll>
			<View>
				<UserHeader>
					<TouchableOpacity onPress={handleUserAvatarPress}>
						<View>
							<Avatar source={{ uri: user.image }} style={{ text: { fontSize: 60 }, image: { opacity: loadingUpdateUserImage ? .5 : 1 } }} alt={user.fullName} size={160} />
							<IconButton icon='edit' variant='filled' color='primary' style={{ root: { position: 'absolute', right: 0, top: 0 } }} />
							{loadingUpdateUserImage && <ActivityIndicator size='large' style={{ position: 'absolute', left: '50%', top: '50%', marginLeft: -18, marginTop: -18 }} color={palette.primary.main} />}
						</View>
					</TouchableOpacity>
					<Typography style={{ fontSize: 26, fontWeight: 'bold' }}>{user.fullName}</Typography>
					<Typography variant='subtitle'>{user.email}</Typography>
				</UserHeader>
				<Paper>
					<Button variant='filled' icon='list' label='Meus Pedidos' onPress={()=>navigation.navigate('OrderRoutes', { screen: 'OrderListScreen' })} />
					<Button variant='filled' icon='heart' label='Meus Produtos favoritos' onPress={()=>navigation.navigate('AddressListScreen')} />
				</Paper>
			</View>
		</ContainerScroll>
	);
}
	
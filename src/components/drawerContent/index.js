import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Icon, Button, Divider } from 'react-native-elements';
import { DrawerItem } from '@react-navigation/drawer';

import {
	Container,
	HeaderContainer,
	HeaderInfoContainer,
	UserName,
	UserEmail,
	HeaderInfo,
	MenuContainer,
	getDraweItemProps,
} from './styles';
import { IS_USER_LOGGED_IN, LOGGED_USER } from '../../graphql/authentication';

export default function DrawerContent() {
	const { data: { isUserLoggedIn } } = useQuery(IS_USER_LOGGED_IN);
	const { data: loggedUserData } = useQuery(LOGGED_USER);
	const loggedUser = loggedUserData ? loggedUserData.me : null;
	
	return (
		<Container>
			<HeaderContainer>
				<Icon type='material-community' name='account' size={69} color='#fff' />
				<HeaderInfoContainer>
					{isUserLoggedIn
						? (
							<>
								<UserName>{loggedUser.full_name}</UserName>
								<UserEmail>{loggedUser.email}</UserEmail>
							</>
						)
						: (
							<>
								<HeaderInfo>Você não está logado</HeaderInfo>
								<Button title='Login' onPress={()=>{}} />
							</>
						)}
				</HeaderInfoContainer>
			</HeaderContainer>

			<Divider />

			<MenuContainer>
				<DrawerItem {...getDraweItemProps({ icon: 'food', label: 'Cardápio' })} onPress={()=>{}} />

				{isUserLoggedIn && (
					<>
						<DrawerItem {...getDraweItemProps({ icon: 'cart', label: 'Carrinho' })} onPress={()=>{}} />

						<Divider />

						<DrawerItem {...getDraweItemProps({ icon: 'account-circle', label: 'Meus dados' })} onPress={()=>{}} />
						<DrawerItem {...getDraweItemProps({ icon: 'view-list', label: 'Meus pedidos' })} onPress={()=>{}} />

					</>
				)}
				
				<Divider />

				<DrawerItem {...getDraweItemProps({ icon: 'information', label: 'Sobre' })} onPress={()=>{}} />

				{isUserLoggedIn
					? <DrawerItem {...getDraweItemProps({ icon: 'logout', label: 'Logout' })} onPress={()=>{}} />
					: (
						<>
							<DrawerItem {...getDraweItemProps({ icon: 'login', label: 'Login' })} onPress={()=>{}} />
							<DrawerItem {...getDraweItemProps({ icon: 'account-plus', label: 'Cadastrar' })} onPress={()=>{}} />
						</>
					)}

			</MenuContainer>
		</Container>
	);
}

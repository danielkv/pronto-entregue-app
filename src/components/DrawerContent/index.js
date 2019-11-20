/* eslint-disable max-len */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Divider, Avatar, ListItem } from 'react-native-elements';
import { DrawerItem } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/routers'

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
import { GET_SELECTED_BRANCH, LOAD_BRANCH } from '../../graphql/branches';
import { logUserOut, resetBranch } from '../../services/init';
import theme from '../../theme';

export default function DrawerContent({ navigation }) {
	const { data: { isUserLoggedIn } } = useQuery(IS_USER_LOGGED_IN);
	const { data: loggedUserData } = useQuery(LOGGED_USER);

	const { data: selectedBranchData } = useQuery(GET_SELECTED_BRANCH);
	const { data: branchData } = useQuery(LOAD_BRANCH, { variables: { id: selectedBranchData.selectedBranch } });

	const loggedUser = loggedUserData ? loggedUserData.me : null;
	const userInitials = loggedUser ? loggedUser.first_name.substr(0, 1).toUpperCase() + loggedUser.last_name.substr(0, 1).toUpperCase() : '';

	const handleLogout = () => {
		logUserOut();
		DrawerActions.closeDrawer();
	}
	
	return (
		<Container>
			<HeaderContainer>
				{isUserLoggedIn && loggedUser
					? <Avatar size={60} rounded title={userInitials} />
					: <Avatar size={60} rounded icon={{ name: 'account-circle' }} />}
				<HeaderInfoContainer>
					{isUserLoggedIn && loggedUser
						? (
							<>
								<UserName>{loggedUser.full_name}</UserName>
								<UserEmail>{loggedUser.email}</UserEmail>
							</>
						)
						: (
							<>
								<HeaderInfo>Você não está logado</HeaderInfo>
								<Button title='Login' onPress={()=>navigation.navigate('LoginScreen')} />
							</>
						)}
				</HeaderInfoContainer>
			</HeaderContainer>

			<Divider />

			<MenuContainer>
				<DrawerItem {...getDraweItemProps({ icon: 'food', label: 'Cardápio' })} onPress={()=>navigation.navigate('HomeScreen')} />
				<DrawerItem {...getDraweItemProps({ icon: 'cart', label: 'Carrinho' })} onPress={()=>navigation.navigate('CartScreen')} />

				{isUserLoggedIn && (
					<>

						<Divider />

						<DrawerItem {...getDraweItemProps({ icon: 'account-circle', label: 'Meus dados' })} onPress={()=>{}} />
						<DrawerItem {...getDraweItemProps({ icon: 'view-list', label: 'Meus pedidos' })} onPress={()=>navigation.navigate('OrderListScreen')} />

					</>
				)}
				
				<Divider />

				<DrawerItem {...getDraweItemProps({ icon: 'information', label: 'Sobre' })} onPress={()=>{}} />

				{isUserLoggedIn
					? <DrawerItem {...getDraweItemProps({ icon: 'logout', label: 'Logout' })} onPress={handleLogout} />
					: (
						<>
							<DrawerItem {...getDraweItemProps({ icon: 'login', label: 'Login' })} onPress={()=>navigation.navigate('LoginScreen')} />
							<DrawerItem
								{...getDraweItemProps({ icon: 'account-plus', label: 'Cadastrar' })}
								onPress={()=>navigation.navigate('SubscriptionScreen')}
							/>
						</>
					)}

			</MenuContainer>
			{branchData
				&& (
					<ListItem
						leftIcon={{ name: 'store' }}
						title={branchData.branch.name}
						subtitle='Trocar filial'
						containerStyle={{ backgroundColor: theme.colors.divider }}
						onPress={()=>resetBranch()}
					/>
				)}
		</Container>
	);
}
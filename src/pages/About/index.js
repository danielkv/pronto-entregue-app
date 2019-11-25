import React from 'react';
import { Platform, Linking } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { ListItem } from 'react-native-elements';

import { Container, ContainerScroll, LogoImage, Content } from './styles';
import logoResource from '../../assets/images/logo-copeiro.png';
import LoadingBlock from '../../components/LoadingBlock';
import ErrorBlock from '../../components/ErrorBlock';

import { LOAD_BRANCH, GET_SELECTED_BRANCH } from '../../graphql/branches';

export default function About() {
	const { data: selectedBranchData } = useQuery(GET_SELECTED_BRANCH);
	const {
		data: branchData,
		loading: loadingBranch,
		error: branchError
	} = useQuery(LOAD_BRANCH, { variables: { id: selectedBranchData.selectedBranch } });
	
	if (loadingBranch) return <LoadingBlock />;
	if (branchError) return <ErrorBlock error={branchError} />;

	const { branch } = branchData;
	const { street, number, district, city, state, zipcode } = branch.address;

	const address = `${street}, ${number}\n${district}\n${city} - ${state}\n${zipcode}`;
	
	return (
		<ContainerScroll>
			<Container>
				<LogoImage source={logoResource} />

				<Content>
					{branch.phones.length && (
						branch.phones.map(phone => {
							const phoneNumber = (Platform.OS === 'android') ? `tel:${phone.number}` : `telprompt:${phone.number}`;

							return (
								<ListItem
									onPress={()=>Linking.openURL(phoneNumber)}
									key={phone.id}
									leftIcon={{ name: 'phone' }}
									title={phone.number}
								/>
							)
						})
					)}
					<ListItem
						contentContainerStyle={{ flexDirection: 'column-reverse' }}
						containerStyle={{ alignItems: 'flex-start' }}
						leftIcon={{ name: 'directions' }}
						subtitle='Endereço'
						title={address}
					/>
					{branch.business_hours.length && (
						branch.business_hours.map((day, index) => {
							const times = day.hours.map(hour => `${hour.from} - ${hour.to}`);
							
							return (
								<ListItem
									contentContainerStyle={{ flexDirection: 'column-reverse' }}
									key={index}
									leftIcon={{ name: 'clock', type: 'material-community' }}
									subtitle={day.day_of_week}
									title={times.join('\n')}
								/>
							)
						})
					)}
				</Content>
			</Container>
		</ContainerScroll>
	);
}

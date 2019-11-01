import React from 'react';
import {Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';

import logoCopeiro from '../../assets/images/logo-copeiro.png';
import { Container, MenuContainer, HelperText } from "./styles";
import { ListItem, Icon } from 'react-native-elements';
import { GET_COMPANY_BRANCHES, SELECT_BRANCH } from '../../graphql/branches';
import { GET_SELECTED_COMPANY } from '../../graphql/companies';

export default function splashScreen({navigation, loadingRoot}) {
	const {data:selectedCompanyData} = useQuery(GET_SELECTED_COMPANY);
	const {data:branchesData, loading:loadingBranches, error} = useQuery(GET_COMPANY_BRANCHES, {variables:{id:selectedCompanyData.selectedCompany}});

	const branches = branchesData && branchesData.company ? branchesData.company.branches : [];

	const [setBranch, {loadingSetBranch}] = useMutation(SELECT_BRANCH)

	return (
		<Container>
			<Image style={{marginBottom:20, alignSelf:'center'}} resizeMethod='resize' source={logoCopeiro} />
			{loadingRoot || loadingBranches ? <ActivityIndicator size={28} color='#B95A02' /> :
			<MenuContainer>
				<HelperText>Selecione a filial</HelperText>
				{branches.map((branch, index)=>(
					<ListItem
						Component={TouchableOpacity}
						key={index}
						containerStyle={{backgroundColor:'white', borderRadius:3, marginBottom:5}}
						title={branch.name}
						titleStyle={{color:'#B95A02', fontSize:14}}
						subtitle={`${branch.address.city} ${branch.address.state}`}
						subtitleStyle={{color:'#999', fontSize:10}}
						leftElement={<Icon name='store' color='#B95A02' />}
						onPress={()=>{setBranch({variables:{id:branch.id}})}}
					/>
				))}
			</MenuContainer>
			}
		</Container>
	);
}

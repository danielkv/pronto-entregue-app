import React, { useState } from 'react';

import { useMutation } from "@apollo/react-hooks";

import { Paper, Typography, TextField, useTheme, Icon, FormHelperText } from '../../react-native-ui';
import AddressResult from './AddressResult';

import { SEARCH_ADDRESS } from "../../graphql/addresses";

// import { Container } from './styles';

export default function AddFirstAddress() {
	const { palette } = useTheme();
	const [addressSearch, setAddressSearch] = useState('');

	const [searchAddress, { loading, searchError, data: { searchAddress: addressesFound = [] } = {} } = {}]= useMutation(SEARCH_ADDRESS)

	function handleSearch(search) {
		searchAddress({ variables: { search } })
	}
	// rua joao quartieiro, 43, sombrio sc
	return (
		<>
			<Paper>
				<Typography variant='title' style={{ marginBottom: 20 }}>Busque sua localização</Typography>
				<TextField
					label='Pesquisar'
					value={addressSearch}
					onChangeText={(text)=>setAddressSearch(text)}
					placeholderTextColor={palette.background.dark}
					disabled={loading}
					style={{
						inputContainer: {
							backgroundColor: palette.background.main
						}
					}}
					actionButton={<Icon name='search' color={palette.background.dark} />}
					actionButtonOnPress={handleSearch}
				/>
			</Paper>
			<Paper>
				{!!searchError && <FormHelperText error>{searchError}</FormHelperText>}
				{!!addressesFound.length && addressesFound.map((addr, index) => <AddressResult key={index} address={addr} />)}
			</Paper>
		</>
	);
}

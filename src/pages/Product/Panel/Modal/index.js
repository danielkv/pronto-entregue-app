import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Alert } from 'react-native';


import { cloneDeep } from 'lodash';

import Panel from '../../../../components/Panel';

import { TextField, useTheme } from '../../../../react-native-ui';
import { calculateOptionsGroupPrice, getGroupNewState } from '../../../../utils/products';
import Option from '../../Option';
import {
	SearchContainer,
	OptionsContainer
} from './styles';

export default function Modal({ optionGroup: optionGroupModal, closeModal, confirmModal }) {
	const [optionGroup, setOptionGroup] = useState(null);
	const [search, setSearch] = useState('');
	const { palette } = useTheme();

	useEffect(()=>{
		return () => {
			setOptionGroup(null);
			setSearch('');
		}
	}, []);

	useEffect(()=>{
		if (optionGroupModal) setOptionGroup(cloneDeep(optionGroupModal));
	}, [optionGroupModal]);

	const price = useMemo(()=>{
		return calculateOptionsGroupPrice(optionGroup);
	}, [optionGroup, calculateOptionsGroupPrice]);

	const handlePressOption = useCallback((optionIndex) => () => {
		try {
			const newState = getGroupNewState(optionGroup, optionIndex)
			
			setOptionGroup(newState);
		} catch (err) {
			Alert.alert(err.message)
		}
	}, [optionGroup, setOptionGroup]);

	if (!optionGroup) return <View />

	return (
		<Panel
			title={optionGroup.name}
			handleCancel={closeModal}
			handleConfirm={()=>confirmModal(optionGroup)}
			badgeText={`R$ ${price.toFixed(2).replace('.', ',')}`}
		>
			{optionGroup.options.length >= 10 && (
				<SearchContainer>
					<TextField
						label='Buscar'
						style={{ inputContainer: { backgroundColor: palette.background.main } }}
						placeholderTextColor='#D1C6B1'
						value={search}
						onChangeText={(text)=>{ setSearch(text.toLowerCase()) }}
					/>
				</SearchContainer>
			)}
			<OptionsContainer>
				{optionGroup.options.filter(opt=>opt.name.toLowerCase().search(search) !== -1).map((option, optionIndex)=>(
					<Option
						key={optionIndex}
						option={option}
						type={optionGroup.type}
						onPress={handlePressOption(optionIndex)}
					/>
				))}
			</OptionsContainer>
		</Panel>
	);
}

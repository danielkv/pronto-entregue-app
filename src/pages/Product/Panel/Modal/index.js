import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { Input, Icon } from 'react-native-elements';

import { cloneDeep } from 'lodash';

import Panel from '../../../../components/Panel';

import theme from '../../../../theme';
import { calculateOptionsGroupPrice, getGroupNewState } from '../../../../utils/products';
import Option from '../../Option';
import {
	SearchContainer,
	OptionsContainer
} from './styles';

export default function modal({ optionGroup: optionGroupModal, closeModal, confirmModal }) {
	const [optionGroup, setOptionGroup] = useState(null);
	const [search, setSearch] = useState('');

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

	const handlePressOption = useCallback((optionId) => () => {
		try {
			const new_state = getGroupNewState(optionGroup, optionId)
			
			setOptionGroup(new_state);
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
					<Input
						value={search}
						onChangeText={(text)=>{ setSearch(text.toLowerCase()) }}
						placeholder='Buscar'
						rightIcon={!!search && (
							<TouchableOpacity onPress={()=>setSearch('')}>
								<Icon name='close' color={theme.palette.divider} />
							</TouchableOpacity>
						)}
					/>
				</SearchContainer>
			)}
			<OptionsContainer>
				{optionGroup.options.filter(opt=>opt.name.toLowerCase().search(search) !== -1).map((option, optionIndex)=>(
					<Option
						key={optionIndex}
						option={option}
						type={optionGroup.type}
						onPress={handlePressOption(option.id)}
					/>
				))}
			</OptionsContainer>
		</Panel>
	);
}

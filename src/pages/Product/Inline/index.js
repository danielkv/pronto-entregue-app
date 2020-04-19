import React, { useCallback } from 'react';
import { View, Alert } from 'react-native';

import { getGroupNewState } from '../../../controller/products';
import { Typography } from '../../../react-native-ui';
import Option from '../Option';

function Inline({ optionsGroups, onItemSelect }) {
	const handlePressOption = useCallback((groupIndex, optionIndex) => () => {
		try {
			const group = optionsGroups[groupIndex];
			const newState = getGroupNewState(group, optionIndex);

			optionsGroups[groupIndex] = newState;

			onItemSelect(optionsGroups);
		} catch (err) {
			Alert.alert('Opa! Acho que você não pode fazer isso', err.message);
		}
	}, [optionsGroups]);

	return (
		<View>
			{optionsGroups.map((group, groupIndex)=>(
				<View key={groupIndex} style={{ marginBottom: 10 }}>
					<Typography variant='title'>{group.name}</Typography>
					<View>
						{group.options.map((option, optionIndex) => (
							<Option
								key={optionIndex}
								option={option}
								type={group.type}
								onPress={handlePressOption(groupIndex, optionIndex)}
							/>
						))}
					</View>
				</View>
			))}
		</View>
	);
}

export default Inline;
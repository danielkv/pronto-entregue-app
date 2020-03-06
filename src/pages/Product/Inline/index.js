import React, { useCallback } from 'react';
import { View } from 'react-native';

import { Typography } from '../../../react-native-ui';
import { getGroupNewState } from '../../../utils/products';
import Option from '../Option';

function Inline({ optionsGroups, onItemSelect }) {
	const handlePressOption = useCallback((groupIndex, optionIndex) => () => {
		const group = optionsGroups[groupIndex];
		const newState = getGroupNewState(group, optionIndex);

		optionsGroups[groupIndex] = newState;

		onItemSelect(optionsGroups);
	}, [optionsGroups]);

	return (
		<View>
			{optionsGroups.map((group, groupIndex)=>(
				<View key={groupIndex}>
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
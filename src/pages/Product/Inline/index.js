import React, { useCallback } from 'react';

import { getGroupNewState } from '../../../utils/products';
import Option from '../Option';
import {
	Container,
	GroupContainer,
	GroupTitle,
	OptionsContainer
} from './styles';

function Inline({ optionsGroups, onItemSelect }) {
	const handlePressOption = useCallback((groupIndex, optionIndex) => () => {
		const group = optionsGroups[groupIndex];
		const option = group.options[optionIndex];
		const new_state = getGroupNewState(group, option.id);

		optionsGroups[groupIndex] = new_state;

		onItemSelect(optionsGroups);
	}, [optionsGroups]);

	return (
		<Container>
			{optionsGroups.map((group, groupIndex)=>(
				<GroupContainer key={groupIndex}>
					<GroupTitle>{group.name}</GroupTitle>
					<OptionsContainer>
						{group.options.map((option, optionIndex) => (
							<Option
								key={optionIndex}
								option={option}
								type={group.type}
								onPress={handlePressOption(groupIndex, optionIndex)}
							/>
						))}
					</OptionsContainer>
				</GroupContainer>
			))}
		</Container>
	);
}

export default Inline;
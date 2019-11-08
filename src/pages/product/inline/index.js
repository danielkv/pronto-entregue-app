import React, { useCallback } from 'react';

import Option from '../option';
import {
	Container,
	GroupContainer,
	GroupTitle,
	OptionsContainer
} from './styles';

function Inline({ optionsGroups, onItemSelect }) {
	const handlePressOption = useCallback((groupIndex, optionIndex) => () => {
		optionsGroups[groupIndex].options[optionIndex].selected = !optionsGroups[groupIndex].options[optionIndex].selected;
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
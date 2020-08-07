import _ from 'lodash';

import getOptionNewState from './getOptionNewState';

export default function getGroupNewState(optionGroup, optionIndex) {
	const group = _.cloneDeep(optionGroup);
	
	if (group.type === 'single') {
		const selectedOptionIndex = group.options.findIndex(opt => opt.selected);
		if (selectedOptionIndex > -1 && selectedOptionIndex !== optionIndex) group.options[selectedOptionIndex].selected = false;
	}

	const option = group.options[optionIndex];
	option.selected = getOptionNewState(group, option);
	group.options.splice(optionIndex, 1, option);
	
	return group;
}
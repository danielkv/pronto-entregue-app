export default function checkGroupRules(group, selectionOffset = 0) {
	let { maxSelect } = group;
	const { minSelect } = group;
	const selectedOptions = group.options.filter(opt=>opt.selected);
	const selectionLength = selectedOptions.length + selectionOffset;

	// Check restraining group max selection
	if (group.restrainedBy && group.restrainedBy.options) {
		const otherOption = group.restrainedBy.options[0];
		maxSelect = otherOption.maxSelectRestrainOther;
	}
	
	// Check the min selection rule
	if (selectionOffset === 0 && minSelect !== 0 && selectionLength < minSelect) {
		throw new Error(`Você deve selecionar no mínimo ${minSelect} ${minSelect > 1 ? 'opções' : 'opção'} em ${group.name}`)
	}

	// Check the max selection rule
	if (maxSelect !== 0 && selectionLength > maxSelect) {
		if (maxSelect === 1) throw new Error(`Você deve selecionar apenas 1 opção em ${group.name}`);
		throw new Error(`Você deve selecionar apenas ${maxSelect} opções em ${group.name}`);
	}
	
	// if all rules above match, return true
	return true;
}
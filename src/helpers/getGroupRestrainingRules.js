export default function getGroupRestrainingRules(optionsGroups, selectedGroup) {
	if (selectedGroup.restrainedBy) {
		const otherGroup = optionsGroups.find(group=>group.id === selectedGroup.restrainedBy.id);
		if (!otherGroup) throw new Error('Não foi possível encontrar o grupo anterior');

		const otherGroupSelectedOptions = otherGroup.options.filter(opt=>opt.selected);
		if (!otherGroupSelectedOptions.length) throw new Error(`Primeiro selecione: ${otherGroup.name}`);

		return { ...selectedGroup, restrainedBy: { ...otherGroup, options: otherGroupSelectedOptions } }
	}
	return selectedGroup;
}
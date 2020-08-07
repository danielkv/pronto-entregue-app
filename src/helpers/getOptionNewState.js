import checkGroupRules from "./checkGroupRules";

export default function getOptionNewState(group, option) {
	if (option.selected) return false;
	
	return checkGroupRules(group, 1);
}
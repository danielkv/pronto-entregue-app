export default class OptionalItem {
	constructor(optional_object) {
		this.id						= optional_object.id;
		this.title 					= optional_object.title;
		this.selection_type 		= optional_object.selection_type;
		this.min_select 			= optional_object.min_select;
		this.max_select 			= optional_object.max_select
		//this.initial_max_select		= optional_object.initial_max_select;
		this.restrict_optional 		= optional_object.restrict_optional;
		this.order 					= optional_object.order;
		this.options 				= optional_object.options;
	}

	setOptions = (options) => {
		this.options = options;
		return this.options;
	}

	getOptions = () => {
		return this.options;
	}

	getMaxSelectRestriction = () => {
		let selectedOptions = this.getSelectedOptions();
		if (selectedOptions.length == 0) return false;
		selectedOptions.sort((a, b)=>{return a.max_select < b.max_select ? -1 : 1});
		return selectedOptions[0].restrict_optional;
	}

	getOptionIndex = (option_id) => {
		return this.options.findIndex((option)=>{return option.id == option_id});
	}
	getOption = (option_id) => {
		let option_index = this.getOptionIndex(option_id);
		return option_index !== -1 ? this.options[option_index] : false;
	}

	switchOptionSelect = (option_id) => {
		let option_index = this.getOptionIndex(option_id);
		let newSelectState = !this.options[option_index].selected;
		this.options[option_index].selected = newSelectState;

		return this.options;
	}

	unselectAll = () => {
		this.options.forEach((option)=>{
			option.selected = false;
		});
	}

	getSelectedOptions = () => {
		return this.options.filter((option)=>{
			return option.selected;
		})
	}

	getTotalAmount = () => {
		let amount = 0;

		this.options.forEach((option)=>{
			if (option.selected) amount += option.price;
		});
	
		return amount;
	}

	getObject = () => {
		return JSON.parse(JSON.stringify(Object.assign({}, this)));
	}

	clone = () => {
		return new OptionalItem(this.getObject());
	}
}
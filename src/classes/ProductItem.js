import OptionalItem from './OptionalItem';

export default class ProductItem {
	constructor(product_object) {
		this.id 			= product_object.id;
		this.title			= product_object.title;
		this.image 			= product_object.image;
		this.desc			= product_object.desc;
		this.price 			= product_object.price;
		this.product_type	= product_object.product_type;
		this.optionals	 	= ProductItem.createOptionals(product_object.optionals);
		this.quantity 		= product_object.quantity || 1;
		this.observations	= product_object.observations || '';
	}

	static createOptionals(optionals) {
		return optionals.map((optional) => {
			return new OptionalItem(optional);
		});
	}

	setQuantity = (quantity) => {
		this.quantity = quantity;
	}

	setOptionals = (optionals) => {
		this.optionals = optionals;
		return this.optionals;
	}

	setOptional = (newOptional) => {
		let optional_index = this.getOptionalIndex(newOptional.id);
		this.optionals[optional_index] = newOptional;

		return this.optionals;
	}

	setOptions = (optional_id, options) => {
		let _index = this.getOptionalIndex(optional_id);
		this.optionals[_index] = options;
		
		return this.optionals;
	}

	getQuantity = () => {
		return this.quantity;
	}

	getOptionals = () => {
		return this.optionals;
	}

	getOptionalIndex = (id) => {
		return this.optionals.findIndex((optional)=>{return optional.id == id});
	}
	
	getOptional = (id) => {
		let optional_index = this.getOptionalIndex(id);
		return optional_index !== -1 ? this.optionals[optional_index] : false;
	}

	getOptionalMaxSelection = (optional_id) => {
		let _optional = this.getOptional(optional_id);
		let _restritedBy = this.getOptional(_optional.restrict_optional);
		
		if (_restritedBy === false) return _optional.max_select;
		
		let _max_select = _restritedBy.getMaxSelectRestriction();

		if (_max_select === false) return false;
		
		return _max_select;
	}
	
	getOnlyOptionalsSelected = () => {
		return this.optionals.filter((optional)=> {
			return optional.getSelectedOptions().length;
		});
	}

	getTotalAmount = () => {
		let amount = 0;
		this.optionals.forEach((optional)=>{
			optional.options.forEach((option)=>{
				if (option.selected) amount += option.price;
			})
		});
	
		amount += this.price;
	
		amount = amount * this.quantity;
	
		return amount;
	}

	getObject = () => {
		return JSON.parse(JSON.stringify(Object.assign({}, this)));
		
	}

	reset = () => {
		this.optionals.forEach((optional)=>{
			optional.unselectAll();
		});
		this.setQuantity(1);
		this.observations = '';
	}

	clone = () => {
		return new ProductItem(this.getObject());
	}
}
class Validation {
	constructor (settings) {
		/*
			fields : {
				fieldName : {
					required : true | false,
					validation : function (value) | Object {
						function : function (value, data),
						message : default | 'string'
					}
				}
			},
		*/
		this.defaultSettings = {
			defaultMessages : {
				required : 'Esse campo é obrigatório!',
				validation : 'Ocorreu um erro de validação'
			}
		}		 

		this.settings = Object.assign(settings, this.defaultSettings);

		this.initialSettings = Object.assign({}, this.settings);

		if (!this.settings.fields) console.error('Não foram definidos campos para validação');
	}

	setOptions (settings) {
		this.settings = Object.assign(this.settings, settings);		
	}

	resetOptions () {
		this.setOptions(this.initialSettings);
	}

	resetErrors () {
		let validationErrors = {};
		Object.entries(this.settings.fields).forEach(([key, value]) => {
			validationErrors[key] = {
				errors : {}
			}
		});

		return {
			errors : validationErrors,
			error : false
		}
	}

	validate (data, tempFields) {
		
		let validationErrors = {};
		let errorBoolean = false;
		let fields = this.settings.fields;
		if (tempFields) fields = Object.assign({}, fields, tempFields);
		
		Object.entries(data).forEach(([key, value]) => {
			if (fields[key]) {
				validationErrors[key] = {
					errors : {}
				}
				if (fields[key].required && value === '') {
					validationErrors[key].errors.required = {
						code : 'required_field',
						message : fields[key].required.message ? fields[key].required.message : this.settings.defaultMessages.required
					};
					errorBoolean = true;
				}

				if (fields[key].validation) {
					let validationFunction;
					let message;
					if (typeof fields[key].validation === 'function') {
						validationFunction = fields[key].validation;
						message = this.settings.defaultMessages.validation;

					} else if (typeof fields[key].validation === 'object' && typeof fields[key].validation.function ) {
						validationFunction = fields[key].validation.function;
						message = fields[key].validation.message ? fields[key].validation.message : this.settings.defaultMessages.validation;
					}

					if (!validationFunction(value, data)) {
						validationErrors[key].errors.validation = {
							code : 'validation',
							message : message
						}
						errorBoolean = true;
					}
				}
			}
		});

		return {
			errors : validationErrors,
			error : errorBoolean
		}
	}
}

export default Validation;
import _ from 'lodash';

class CompanyController {
	deserializeDeliveryTime(value) {
		return value.split('-').map(time => {
			const parsedTime = _.toInteger(time);
			let hours = Math.floor(parsedTime / 60);
			let minutes = parsedTime - (hours * 60);
		
			return { hours, minutes }
		})
	}

	renderDeliveryTime(value) {
		const times = this.deserializeDeliveryTime(value);

		const format = times.reduce((acc,{ hours, minutes }) =>{
			if (hours) {
				if (minutes) return 'hoursminutes';
				return acc === 'hoursminutes' ? acc : 'hours'
			} else {
				if (acc === 'hoursminutes') return acc;
				if (acc === 'hours') return 'hoursminutes';
				return 'minutes';
			}
		}, 'minutes')

		if (times.length === 1) return `~${this.renderTime(times[0], format)}`;
		
		return times.reduce((acc, time) =>{
			const displayTime = this.renderTime(time, format);
			return !acc ? displayTime : `${acc} - ${displayTime}`
		}, '')
	}

	renderTime ({ hours, minutes }, format) {
		//if (hours < 10) hours = '0' + hours;
		if (minutes < 10) minutes = '0' + minutes;

		switch (format) {
			case 'hoursminutes':
				return `${hours}h${minutes}`;
			case 'hours':
				return `${hours}h`;
			case 'minutes':
			default:
				return `${minutes}min`;
		}
	}
}

export default new CompanyController();
import _ from 'lodash';
import moment from 'moment';

class CompanyController {
	/*allowBuyClosed(company) {
		const { allowBuyClosed, allowBuyClosedTimeBefore, businessHours } = company.configs;
		if (!allowBuyClosed || company.isOpen) return false;

		const now = moment();
		const nextOpenHour = this.getNextOpenHour(businessHours, now.clone());
		if (!moment.isMoment(nextOpenHour)) return false;

		const timeDiff = nextOpenHour.diff(now, 'minutes');
		if (timeDiff < 0 || timeDiff > allowBuyClosedTimeBefore) return false;

		return true
	}

	getNextCloseHour(businessHours) {
		const businessDayHours = this.getBusinessDayHours(businessHours)
		let i = 0;
		const max = 1;
		let from, to;

		do {
			let hour = businessDayHours[i];
			if (hour.from && hour.to) {
				from = moment().set(this.breakTimeString(hour.from))
				to = moment().set(this.breakTimeString(hour.to))
			}

			i++;
		} while (i < max && !(from.isBefore() && to.isAfter()))

		// check if it is last minute of the day
		const lastMinute = moment().endOf('day');
		if (lastMinute.isSame(to, 'minute')) {
			const nextDay = moment().add(1, 'day');
			const nextDayBusinessDatHours = this.getBusinessDayHours(businessHours, nextDay)[0];
			if (nextDayBusinessDatHours.from && nextDayBusinessDatHours.to) {
				const nextDayStartOf = nextDay.clone().startOf('day');
				const nextDayCompare = nextDay.clone().set(this.breakTimeString(nextDayBusinessDatHours.from))
				if (nextDayStartOf.isSame(nextDayCompare, 'minute')) to = nextDay.clone().set(this.breakTimeString(nextDayBusinessDatHours.to))
			}
		}

		return to;
	}

	getBusinessDayHours(businessHours, day=moment()) {
		const dayOfWeek = day.format('d');
		const businessDayHours = businessHours[dayOfWeek].hours;

		return businessDayHours;
	}

	breakTimeString(time) {
		const splitted = time.split(':');
		return { hour: splitted[0], minute: splitted[1] }
	}

	getNextOpenHour(businessHours, fromDay=moment()) {
		let nextOpenHourFrom, nextOpenHourTo;
		let i = 0, count = 1;
		let max = businessHours.length || 0
		
		do {

			if (i>1) {
				i=0;
				fromDay.add(1, 'day');
			}
			const nextOpenBusinessDay = this.getBusinessDayHours(businessHours, fromDay);

			if (nextOpenBusinessDay.length) {
				const hour = nextOpenBusinessDay[i];
				if (hour && hour.from && hour.to) {
					nextOpenHourFrom = fromDay.clone().set(this.breakTimeString(hour.from))
					nextOpenHourTo = fromDay.clone().set(this.breakTimeString(hour.to))
				}
			}

			i++;
			count++
		} while (count <= max && (!nextOpenHourFrom || (nextOpenHourFrom.isBefore() && nextOpenHourTo.isBefore())))

		return nextOpenHourFrom;
	}*/

	renderNextHour (datetime) {
		return moment(datetime).calendar({
			sameDay: '[às] HH:mm',
			nextDay: '[amanhã às] HH:mm',
			nextWeek: 'ddd [ás] HH:mm',
			lastDay: '[ontem]',
			lastWeek: '[Última] ddd',
			sameElse: 'DD/MM/YYYY'
		});
	}

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
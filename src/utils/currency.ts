import currency from 'currency.js';

export function BRL(value: number) {
	return currency(value, {
		pattern: '! #',
		negativePattern: '-! #',
		symbol: "R$",
		decimal: ',',
		separator: '.',
		formatWithSymbol: true
	});
}
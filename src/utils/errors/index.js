export function getErrorMessage(err, debug=__DEV__) {
	if (debug) console.log(err?.graphQLErrors?.[0]?.message || (err?.networkError?.result?.errors || (err?.message || err)));

	return extractFirstError(err).message;
}

export function extractFirstError(err) {
	let code, message;

	if (err.graphQLErrors && err.graphQLErrors.length) {
		code = err.graphQLErrors[0].extensions.code;
		message = err.graphQLErrors[0].message;
	} else if (err.networkError) {
		const networkError = err.networkError?.result?.errors[0] || err.networkError;

		code = networkError?.extensions?.code || 'NETWORK_ERROR';
		message = networkError.message;
	} else {
		code = err?.code || 'ERROR';
		message = err?.message || err;
	}

	try {
		const parsed = JSON.parse(message);
		return parsed;
	} catch (err) {
		return {
			code,
			message
		}
	}

	
}

export class CartCompanyError extends Error {
	constructor(message) {
		super(message);
		this.type = 'CartCompanyError';
	}
}
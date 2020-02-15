module.exports = {
	'extends': 'airbnb',
	'parser': 'babel-eslint',
	'env': {
		'jest': true,
	},
	'rules': {
		'no-use-before-define': 'off',
		'react/jsx-filename-extension': 'off',
		'react/prop-types': 'off',
		'comma-dangle': 'off',
		"linebreak-style": 'off',
		"react/jsx-indent" : ["error", 'tab'],
		"jsx-quotes": ["error", "prefer-single"],
		"indent": ["error", "tab"],
		"no-tabs" : 0,
		"arrow-body-style": 0,
		"semi": 0,
		"arrow-parens": 0,
		"eol-last": 0,
		"arrow-spacing":0,
		"react/no-array-index-key":0,
		"react/jsx-indent-props":["error", 'tab'],
		"camelcase":0,
		"max-len":['error', 150],
		"no-param-reassign": ["error", { "props": false }],
		"import/prefer-default-export" : "error",
		"no-trailing-spaces": ['error', {skipBlankLines:true, ignoreComments:true}],
		"object-curly-newline": ["error", { multiline: true, consistent: true }],
		"react/jsx-props-no-spreading": 0,
	},
	'globals': {
		"fetch": false
	}
}
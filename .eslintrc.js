module.exports = {
	'parser': 'babel-eslint',
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "process": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
		"@typescript-eslint",
		"eslint-plugin-import-helpers"
    ],
    "rules": {
		"@typescript-eslint/no-explicit-any": "off",
    	"@typescript-eslint/no-parameter-properties": "off",
		"@typescript-eslint/no-unused-vars": "error",
		"react/display-name":"off",
		"no-unused-vars": 'off',
		"key-spacing": "error",
		"object-curly-spacing": ["error", "always"],
		"array-bracket-spacing": ["error", "never"],
		'no-use-before-define': 'off',
		'react/jsx-filename-extension': 'off',
		'react/prop-types': 'off',
		'comma-dangle': 'off',
		"linebreak-style": 'off',
		"react/jsx-indent" : ["error", 'tab'],
		"jsx-quotes": ["error", "prefer-single"],
		"indent": ["error", "tab", { "SwitchCase": 1 }],
		"no-tabs" : 0,
		"arrow-body-style": 0,
		"semi": 0,
		"arrow-parens": 0,
		"eol-last": 0,
		"arrow-spacing":0,
		"react/no-array-index-key":0,
		"react/jsx-indent-props":["error", 'tab'],
		"camelcase": "error",
		"max-len": 0,
		"no-param-reassign": ["error", { "props": false }],
		"import/prefer-default-export" : 0,
		"no-trailing-spaces": ['error', {skipBlankLines:true, ignoreComments:true}],
		"object-curly-newline": ["error", { multiline: true, consistent: true }],
		"switch-colon-spacing": ["error", {"after": true, "before": false}],
		"react/jsx-props-no-spreading": 0,
		"import-helpers/order-imports": [
			"warn",
			{
				"newlinesBetween": "always", // new line between groups
				"groups": [
					"/^react/",
					"module",
					"/components/",
					["parent", "sibling", "index"],
					"/\/graphql\//"
				],
				"alphabetize": { "order": "asc", "ignoreCase": true }
			}
		]
    }
};
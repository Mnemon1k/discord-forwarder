module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: ['airbnb'],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [],
	rules: {
		'no-console': 0,
		'class-methods-use-this': 0,
		'no-unused-vars': 0,
		'no-await-in-loop': 0,
		'no-unreachable-loop': 0,
		'no-new': 0,
		'no-continue': 0,
		'no-restricted-syntax': 0,
		'no-nested-ternary': 0,
		'consistent-return': 0,
		'no-alert': 0,
		indent: [2, 'tab'],
		'no-tabs': 0,
		// 'no-tabs': ['error', {allowIndentationTabs: 0}],
		'import/extensions': 0,
		allowIndentationTabs: 0,
		'linebreak-style': 0,
		'import/prefer-default-export': 0,
		'max-len': [2, 550],
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1,
				maxEOF: 1,
			},
		],
		'no-underscore-dangle': [
			'error',
			{
				allow: ['_d', '_dh', '_h', '_id', '_m', '_n', '_t', '_text'],
			},
		],
		'object-curly-newline': 0,
	},
};

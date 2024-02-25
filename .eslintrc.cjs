module.exports = {
	plugins: ['@typescript-eslint', 'react', 'prettier'],
	extends: [
		'next',
		'prettier',
		'prettier/@typescript-eslint',
		'prettier/react',
		'eslint-config-prettier',
	],
};

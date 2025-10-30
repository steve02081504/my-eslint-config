import babel from 'npm:@babel/eslint-parser'
import html from 'npm:@html-eslint/eslint-plugin'
import destructuringMerge from 'npm:eslint-plugin-destructuring-merge'
import htmlreader from 'npm:eslint-plugin-html'
import importPlugin from 'npm:eslint-plugin-import'
import jsdoc from 'npm:eslint-plugin-jsdoc'
import optimizeRegex from 'npm:eslint-plugin-optimize-regex'
import removeDuplicates from 'npm:eslint-plugin-remove-duplicates'
import UnusedImports from 'npm:eslint-plugin-unused-imports'
import decled_globals from 'npm:globals'
import tseslint from 'npm:typescript-eslint'

const commonPlugins = {
	'optimize-regex': optimizeRegex,
	'unused-imports': UnusedImports,
	'destructuring-merge': destructuringMerge,
	'remove-duplicates': removeDuplicates,
	import: importPlugin,
	jsdoc,
	html,
	'typescript-eslint': tseslint
}

const commonRules = {
	'jsdoc/require-jsdoc': ['error', {
		require: {
			FunctionDeclaration: true, // function foo() {}
			MethodDefinition: true,    // class A { foo() {} }
			ClassDeclaration: true,    // class A {}
			ArrowFunctionExpression: true, // const foo = () => {}
			FunctionExpression: true, // const foo = function() {}
		},
		contexts: [
			'ExportNamedDeclaration',
			'ExportDefaultDeclaration'
		]
	}],
	'jsdoc/require-param': 'error',
	'jsdoc/require-param-description': 'error',
	'jsdoc/require-param-name': 'error',
	'jsdoc/require-param-type': 'error',
	'jsdoc/require-returns': 'error',
	'jsdoc/require-returns-type': 'error',
	'jsdoc/require-returns-description': 'error',

	'jsdoc/check-syntax': 'error',
	'jsdoc/check-tag-names': 'error',

	'remove-duplicates/remove-array-duplicates': ['error'],
	'import/order': [
		'error',
		{
			groups: [
				'builtin', // Node.js 内置模块
				'external', // 第三方库
				'internal', // 项目内部模块
				'parent', // 父目录
				'sibling', // 兄弟文件
				'index' // 当前目录的 index 文件
			],
			'newlines-between': 'always',
			alphabetize: {
				order: 'asc',
				caseInsensitive: true
			}
		}
	],
	'no-undef': ['error'],
	'no-useless-escape': ['error'],
	semi: ['error', 'never'],
	'no-duplicate-imports': ['error'],
	curly: ['error', 'multi'],
	indent: ['error', 'tab', {
		VariableDeclarator: 1,
		MemberExpression: 1,
		SwitchCase: 1,
		ignoredNodes: ['ConditionalExpression'],
	}],
	quotes: ['error', 'single'],
	'quote-props': ['error', 'as-needed'],
	'object-shorthand': ['error', 'always'],
	'prefer-destructuring': ['warn', {
		VariableDeclarator: { array: true, object: true },
		AssignmentExpression: { array: true, object: true },
	}, {
		enforceForRenamedProperties: true,
	}],
	'no-extra-parens': ['error', 'all', {
		nestedBinaryExpressions: false,
		returnAssign: false,
	}],
	'no-constant-condition': ['error', { checkLoops: false }],
	'optimize-regex/optimize-regex': 'warn',
	'unused-imports/no-unused-imports': 'error',
	'no-unused-vars': 'off',
	'no-var': 'error',
	'prefer-const': ['error', {
		destructuring: 'all',
		ignoreReadBeforeAssign: true,
	}],
	'destructuring-merge/destructuring-merge': 'warn',
	'html/no-duplicate-class': 'error',
	'html/no-duplicate-id': 'error',
	'html/no-duplicate-attrs': 'error',
	'html/no-duplicate-in-head': 'error',
	'html/no-ineffective-attrs': 'error',
	'html/no-inline-styles': 'error',
	'html/no-invalid-entity': 'error',
	'html/no-nested-interactive': 'error',
	'html/no-obsolete-tags': 'error',
	'html/no-script-style-type': 'error',
	'html/prefer-https': 'error',
	'html/require-attrs': [
		'error',
		{
			tag: 'a',
			attr: 'rel',
			value: 'noopener',
			message: 'for security, please add the rel="noopener" attribute to the <a> tag',
		},
	],
	'html/no-restricted-attr-values': [
		'error',
		{
			attrPatterns: ['rel'],
			attrValuePatterns: ['noreferrer'],
			message: 'noreferrer is useless.',
		}
	],
	'html/require-closing-tags': 'error',
	'html/require-doctype': 'error',
	'html/require-li-container': 'error',
	'html/require-meta-charset': 'error',
	'html/no-multiple-h1': 'error',
	'html/require-lang': 'error',
	'html/require-meta-description': 'error',
	'html/require-open-graph-protocol': 'error',
	'html/require-title': 'error',
	'html/no-aria-hidden-on-focusable': 'error',
	'html/no-empty-headings': 'error',
	'html/no-heading-inside-button': 'error',
	'html/no-invalid-role': 'error',
	'html/no-skip-heading-levels': 'error',
	'html/require-form-method': 'error',
	'html/require-frame-title': 'error',
	'html/require-input-label': 'error',
	'html/require-meta-viewport': 'error',
	'html/indent': ['error', 'tab'],
	'html/lowercase': 'error',
	'html/no-extra-spacing-attrs': ['error', {
		enforceBeforeSelfClose: true,
		disallowMissing: true,
	}],
	'html/no-extra-spacing-text': 'error',
	'html/no-multiple-empty-lines': 'error',
	'html/no-trailing-spaces': 'error',
	'html/sort-attrs': 'error',
}

const globals = {
	...decled_globals.browser,
	process: 'readonly',
}

/**
 * ESLint 配置。
 * @type {import('npm:eslint').Linter.FlatConfig[]}
 */
export default [
	{
		ignores: ['**/dist/*', '**/data/*'],
		files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.html'],
		plugins: {
			...commonPlugins
		},
		languageOptions: {
			ecmaVersion: 'latest',
			parser: babel,
			parserOptions: {
				requireConfigFile: false,
				ecmaFeatures: {
					globalReturn: true
				}
			},
			globals,
		},
		rules: commonRules,
	},
	{
		ignores: ['**/dist/*', '**/data/*'],
		files: ['**/*.html'],
		plugins: {
			...commonPlugins,
			htmlreader,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			parser: babel,
			parserOptions: {
				requireConfigFile: false,
				ecmaFeatures: {
					globalReturn: true
				}
			},
			globals,
		},
		rules: commonRules,
	},
	{
		ignores: ['**/dist/*', '**/data/*'],
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			...commonPlugins,
			'@typescript-eslint': tseslint.plugin,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			parser: tseslint.parser,
			globals,
		},
		rules: {
			...commonRules,
			'no-extra-parens': 'off',
			'@typescript-eslint/no-unused-vars': 'error',
		},
	},
]

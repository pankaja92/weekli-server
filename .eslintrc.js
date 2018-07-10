module.exports = {
    "plugins": ["node","jest","plugin:jest/recommended"],
    "extends": ["airbnb-base", "plugin:prettier/recommended","plugin:node/recommended"],
    "rules": {
        'no-console': 'off',
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "node/no-deprecated-api": ["error", {
            "ignoreModuleItems": [],
            "ignoreGlobalItems": []
        }],
        "env": {"es6": true},
        "parserOptions": {"ecmaVersion": 2018}
    },
    "env": {
        "jest": true
    }
};
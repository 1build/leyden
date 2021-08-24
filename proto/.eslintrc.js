module.exports = {
    "env": {
        "browser": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
        },
    },
    "plugins": [
        "react",
        "@typescript-eslint",
    ],
    "rules": {
        "array-bracket-spacing": [
            "error",
            "never",
        ],
        "eol-last": [
            "error",
            "always",
        ],
        "eqeqeq": [
            "error",
            "always",
            { "null": "ignore" },
        ],
        "max-len": [
            "error",
            {
                "code": 120,
                "ignoreUrls": true,
                "tabWidth": 4,
            }
        ],
        "no-console": "error",
        "object-curly-spacing": [
            "error",
            "always",
        ],
        "semi": [
            "error",
            "always",
        ],
        "@typescript-eslint/indent": [
            "error",
            4,
        ],
        "@typescript-eslint/no-unused-vars": [
            "error",
            {"argsIgnorePattern": "^_"}
        ],
        "@typescript-eslint/unbound-method": "error",
        "@typescript-eslint/quotes": [
            "error",
            "single",
            { "avoidEscape": true },
        ],
    },
    "settings": {
        "react": {
            "version": "detect",
        }
    }
};

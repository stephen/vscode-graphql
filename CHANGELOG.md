# Change Log

## 0.2.0
- Upgrade graphql-language-service-server to [^1.1.2](https://github.com/stephen/vscode-graphql/pull/19) (thanks @lostplan, @mgadda)
  - Add support for `textDocument/hover`
  - Add support for online schemas, configurable via [`.graphqlconfig`](https://github.com/graphcool/graphql-config)
  - Remove watchman requirement
- Stop opening debug console on startup

## 0.1.8
- Support debugging in node 7.7+ (https://github.com/stephen/vscode-graphql/pull/14)

## 0.1.7
- Support syntax highlighting for type, interface, and enum declarations
- Improve syntax highlighting for directives, array types, variable declarations

## 0.1.6
- Fix an issue with multiple `graphql` dependencies in `node_modules`

## 0.1.5
- Upgrade graphql-language-service-server to 1.0.18

## 0.1.4
- Fix Comment Selection support (https://github.com/stephen/vscode-graphql/pull/5)

## 0.1.0
- Support for language service features using [graphql-language-service](https://github.com/graphql/graphql-language-service/)

## 0.0.1
- Initial release
- Syntax highlighting support

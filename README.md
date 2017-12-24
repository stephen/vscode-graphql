# vscode-graphql
Syntax highlighting, diagnostics, autocomplete, and go to definition for `.graphql` files.

## Features
- Syntax highlighting
- Autocomplete
- Go to definition
- Error diagnostics

Autocomplete, go to definition, and diagnostics are language server features supported by the [graphql-language-service](https://github.com/graphql/graphql-language-service/).

## Configuration
To turn on language server features, you can enable the `graphql.useLanguageServer` flag in your settings.

Using the language server will require a schema to be specified via a `.graphqlconfig` file.

Example:
```json
{
  "schemaPath": "./schema.json"
}
```

See [here](https://github.com/graphcool/graphql-config#usage) for other ways to provide a GraphQL schema.

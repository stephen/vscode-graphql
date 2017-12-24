# vscode-graphql
Syntax highlighting, diagnostics, autocomplete, and go to definition for `.graphql` files.

## Features
- Syntax highlighting
- Autocomplete
- Go to definition
- Error diagnostics

Autocomplete, go to definition, and diagnostics are language server features supported by the [graphql-language-service](https://github.com/graphql/graphql-language-service/).

## Configuration
You can specify a schema to validate files against using a `.graphqlconfig` file. Without it, this extension will not provide any langauge server features.

Example:
```json
{
  "schemaPath": "./schema.json"
}
```

See [here](https://github.com/graphcool/graphql-config#usage) for more detail.

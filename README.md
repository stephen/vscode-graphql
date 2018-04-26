# vscode-graphql
Syntax highlighting, diagnostics, autocomplete, and go to definition for `.graphql` / `.gql` files.

## Features
- Syntax highlighting
- Autocomplete
- Go to definition
- Error diagnostics

Autocomplete, go to definition, and diagnostics are language server features supported by the [graphql-language-service](https://github.com/graphql/graphql-language-service/).

## Installation

Install [stpn.vscode-graphql](https://marketplace.visualstudio.com/items?itemName=stpn.vscode-graphql) from the marketplace or from the command line with:

```
code --install-extension stpn.vscode-graphql
```

## Configuration
Language server features will be enabled when a `.graphqlconfig` file is found in the project.

Using the language server will require a schema to be specified via a `.graphqlconfig` file.

Example:
```json
{
  "schemaPath": "./schema.json"
}
```

See [here](https://github.com/graphcool/graphql-config#usage) for other ways to provide a GraphQL schema.

## Developing

### Debugging `graphql-language-service`

The language service is run, and debugged, as a standalone Node.js process. See [Node.js debugging guide](https://nodejs.org/en/docs/guides/debugging-getting-started/) for general information.

The simplest way to debug is to open chrome://inspect in Chrome and browse for the process. Alternatively in the test target VSCode (i.e. where the extension is running) toggle View → Output and follow the printed instructions.

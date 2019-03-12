import * as path from "path";
import { getGraphQLProjectConfig } from 'graphql-config'
 
import { workspace, ExtensionContext, window, commands } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient";
import { disconnect } from "cluster";

function getConfig() {
  return workspace.getConfiguration(
    "graphql",
    window.activeTextEditor ? window.activeTextEditor.document.uri : null,
  );
}

export function activate(context: ExtensionContext) {
  let config = getConfig();
  const gqlConfig = getGraphQLProjectConfig(workspace.rootPath)

  let serverModule = context.asAbsolutePath(
    path.join("bin/server", "server.js"),
  );

  let debugOptions = {
    execArgv: ["--nolazy", "--debug=6009", "--inspect=localhost:6009"],
  };

  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  let clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "graphql" }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/*.{graphql,gql}"),
    },
    outputChannelName: "graphql language server",
  };

  const client = new LanguageClient(
    "graphql",
    "GraphQL Language Server",
    serverOptions,
    clientOptions,
    true,
  );

  // Restart the language client on changes to the schema
  const schemaPath = gqlConfig.schemaPath;
  console.log(schemaPath);
  const watcher = workspace.createFileSystemWatcher(schemaPath)
  watcher.onDidChange(() => {
    client.stop().then(() => {
      client.start();
    });
  });

  const disposable = client.start();
  context.subscriptions.push(disposable);
}

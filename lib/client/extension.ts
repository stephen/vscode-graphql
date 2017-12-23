import * as path from "path";

import { workspace, ExtensionContext, window } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient";

export function activate(context: ExtensionContext) {
  let serverModule = context.asAbsolutePath(
    path.join("bin/server", "server.js"),
  );

  let debugOptions = { execArgv: ["--nolazy", "--debug=6009"] };

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
      configurationSection: "lspGraphql",
      fileEvents: workspace.createFileSystemWatcher("**/*.graphql"),
    },
  };

  let disposable = new LanguageClient(
    "lspGraphql",
    "GraphQL Language Server",
    serverOptions,
    clientOptions,
  ).start();

  context.subscriptions.push(disposable);
}

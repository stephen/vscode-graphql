import * as path from "path";

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

  context.subscriptions.push(
    workspace.onDidChangeConfiguration(async () => {
      const newConfig = getConfig();

      if (config.useLanguageServer !== newConfig.useLanguageServer) {
        const show = await window.showInformationMessage(
          "Reload VSCode window to enable/disable language server",
          "Reload",
        );

        commands.executeCommand("workbench.action.reloadWindow");
      }
      config = newConfig;
    }),
  );

  if (!config.useLanguageServer) {
    return;
  }

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
      fileEvents: workspace.createFileSystemWatcher("**/*.graphql"),
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

  const disposable = client.start();
  client.outputChannel.show();

  context.subscriptions.push(disposable);
}

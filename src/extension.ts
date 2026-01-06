import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  const insertModel = vscode.commands.registerCommand(
    'pydantic-helper.insertModel',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const snippet = new vscode.SnippetString(
`from pydantic import BaseModel, Field

class ModelName(BaseModel):
    field_name: str = Field(..., description="description")
`
      );

      editor.insertSnippet(snippet);
    }
  );

  context.subscriptions.push(insertModel);
}

export function deactivate() {}

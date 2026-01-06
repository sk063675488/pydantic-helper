"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
function activate(context) {
    const insertModel = vscode.commands.registerCommand('pydantic-helper.insertModel', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        const snippet = new vscode.SnippetString(`from pydantic import BaseModel, Field

class ModelName(BaseModel):
    field_name: str = Field(..., description="description")
`);
        editor.insertSnippet(snippet);
    });
    context.subscriptions.push(insertModel);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map
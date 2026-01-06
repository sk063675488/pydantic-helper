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
  const insertSnippet = (content: string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active editor found');
      return;
    }
    editor.insertSnippet(new vscode.SnippetString(content));
  };

  // 1️⃣ Pydantic BaseModel
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'pydantic-helper.insertModel',
      () => {
        insertSnippet(
          `from pydantic import BaseModel, Field

class ModelName(BaseModel):
    field_name: str = Field(..., description="description")
`
        );
      }
    )
  );

  // 2️⃣ FastAPI App
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'pydantic-helper.insertFastAPIApp',
      () => {
        insertSnippet(
          `from fastapi import FastAPI

app = FastAPI(
    title="My API",
    version="1.0.0"
)
`
        );
      }
    )
  );

  // 3️⃣ FastAPI Request & Response Models
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'pydantic-helper.insertFastAPIModels',
      () => {
        insertSnippet(
          `from pydantic import BaseModel, Field

class RequestModel(BaseModel):
    name: str = Field(..., description="Name")

class ResponseModel(BaseModel):
    message: str
    data: dict | None = None
`
        );
      }
    )
  );

  // 4️⃣ FastAPI CRUD Endpoint
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'pydantic-helper.insertFastAPICRUD',
      () => {
        insertSnippet(
          `from fastapi import APIRouter
from .models import RequestModel, ResponseModel

router = APIRouter()

@router.post("/", response_model=ResponseModel)
def create_item(payload: RequestModel):
    return ResponseModel(
        message="Created successfully",
        data=payload.model_dump()
    )
`
        );
      }
    )
  );
}


export function deactivate() { }

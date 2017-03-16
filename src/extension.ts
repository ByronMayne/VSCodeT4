'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import TemplateGenerator from './template-generator';
import T4Diagonostics from './T4Diagonostics';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) 
{
    let templateGenerator = new TemplateGenerator();
    let t4Diagonostics = new T4Diagonostics();
    t4Diagonostics.activate(context);
    templateGenerator.activate(context, t4Diagonostics);
    context.subscriptions.push(templateGenerator);
    context.subscriptions.push(t4Diagonostics);
}


// this method is called when your extension is deactivated
export function deactivate() 
{
}
'use strict';

import * as vscode from 'vscode';
import  { Disposable, CancellationToken, TextDocument, Position, DocumentHighlight }  from 'vscode'

export default class T4Diagonostics implements vscode.CodeActionProvider 
{
    private diagnosticCollection: vscode.DiagnosticCollection;

	public activate(context: vscode.ExtensionContext)
    {
        context.subscriptions.push(this);
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection();
    }

    public dispose(): void 
    {
		this.diagnosticCollection.clear();
		this.diagnosticCollection.dispose();
	}

    public ParseErrors(error:string) : void
    {
       console.log("Parsing Error Report");
       //* Get our report
       let errorReport = JSON.parse(error);
       // Write out our ParseErrors
       console.error("Transfrom Error");
       console.log( "inputPath: " + errorReport.inputPath);
       console.log( "outputPath: " + errorReport.outputPath);
       errorReport.compileErrors.forEach( compileError => {
           console.log("   Line: " + compileError.Line);
           console.log("   Column: " + compileError.Column);
           console.log("   ErrorNumber: " + compileError.ErrorNumber);
           console.log("   ErrorText: " + compileError.ErrorText);
           console.log("   FileName: " + compileError.FileName);
           console.log("   IsWarning: " + compileError.IsWarning);
       });
    }

    

    public provideCodeActions(document: vscode.TextDocument, range: vscode.Range, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.Command[] 
    {
		return null;
	}

    private runCodeAction(document: vscode.TextDocument, range: vscode.Range, message:string): any
    {

    }
}
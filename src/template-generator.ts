'use strict';
import  { Disposable, workspace, TextDocument, window }  from 'vscode'

import * as vscode from 'vscode';
import * as path from 'path';
import * as cp from 'child_process';

// The path to the transfrom text exe.
const OUTPUT_EXTENSION: string = ".cs";
import T4Diagonostics from './T4Diagonostics';


export default class TemplateGenerator
{
    public errorHanlder: T4Diagonostics;
    public name:string = "Byron";

    public GetExePath() : string
    {
        // Unix
        return "${workspaceRoot}lib\\Mono.TextTemplating\\Builds\\Unix\\MonoTextTemplating.out"
        // Windows
        //return "${workspaceRoot}lib\\Mono.TextTemplating\\Builds\\Windows\\Mono.TextTemplating.exe"
    }

    // Invoked when we activate our module.
    public activate(context: vscode.ExtensionContext, errorHandler:T4Diagonostics)
    {
        this.errorHanlder = errorHandler;
        workspace.onDidSaveTextDocument(this.TransfromTemplate, this);
    }

    // Invoked everytime we save our template
    private TransfromTemplate(textDocument: TextDocument) : void
    {
        // Get our file path
        let input = textDocument.uri.fsPath;
        // Get the directory
        let directory = path.dirname(input);
        // Get the name (with extension)
        let fileName = path.basename(input);
        // Get the extension
        let extension = path.extname(input);
        // Replace the extesion with the correct one
        fileName = fileName.replace(extension, OUTPUT_EXTENSION);
        // Create our output path.
        let output = directory  + "\\" + fileName;
        // Run it with weird callback this was done to always preserve 'this'
        cp.execFile(this.GetExePath(), [input, output], (error, stdout, stderr) => this.OnTranformComplete(error, stdout, stderr));
    }

    // Invoked when the cp.exec command finishes
    private OnTranformComplete(error: Error, stdout: string, stderr: string) : void
    {
        // Do we have an error?
        if(error !== null)
        {
            // Show a header
            window.showErrorMessage("Transfrom Error");
            this.errorHanlder.ParseErrors(stdout);
        }
        else
        {
            console.log("Successful");
        }
    }

    public dispose(): void
    {

    }
}
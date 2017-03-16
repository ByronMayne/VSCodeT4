'use strict';
import  { Disposable, workspace, TextDocument, window }  from 'vscode'

import * as vscode from 'vscode';
import * as path from 'path';
import * as cp from 'child_process';

// The path to the transfrom text exe.
const EXE_PATH: string = 'C:\\Users\\byron\\tt\\lib\\Mono.TextTemplating\\Builds\\Windows\\Mono.TextTemplating.exe';
const OUTPUT_EXTENSION: string = ".cs";
import T4Diagonostics from './T4Diagonostics';

export default class TemplateGenerator
{
    private errorHanlder: T4Diagonostics;

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
        // Run it
        cp.execFile(EXE_PATH, [input, output], this.OnTranformComplete);
    }

    // Invoked when the cp.exec command finishes
    private OnTranformComplete(error: Error, stdout: string, stderr: string) : void
    {
        // Do we have an error?
        if(error !== null)
        {
            // Show a header
            window.showErrorMessage("Transform error! " + error.name);
            console.log(stderr);
            console.log(stdout);
            //this.errorHanlder.ParseErrors("S");
        }
        else
        {
            console.log(stdout);
        }
    }

    public dispose(): void 
    {

    }
}
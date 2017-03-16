'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path = require("path");
const cp = require("child_process");
// The path to the transfrom text exe.
const EXE_PATH = 'C:\\Users\\byron\\tt\\lib\\Mono.TextTemplating\\Builds\\Windows\\Mono.TextTemplating.exe';
const OUTPUT_EXTENSION = ".cs";
class TemplateGenerator {
    // Invoked when we activate our module.
    activate(context, errorHandler) {
        this.errorHanlder = errorHandler;
        vscode_1.workspace.onDidSaveTextDocument(this.TransfromTemplate, this);
    }
    // Invoked everytime we save our template
    TransfromTemplate(textDocument) {
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
        let output = directory + "\\" + fileName;
        // Run it
        cp.execFile(EXE_PATH, [input, output], this.OnTranformComplete);
    }
    // Invoked when the cp.exec command finishes
    OnTranformComplete(error, stdout, stderr) {
        // Do we have an error?
        if (error !== null) {
            // Show a header
            vscode_1.window.showErrorMessage("Transform error! " + error.name);
            console.log(stderr);
            console.log(stdout);
            //this.errorHanlder.ParseErrors("S");
        }
        else {
            console.log(stdout);
        }
    }
    dispose() {
    }
}
exports.default = TemplateGenerator;
//# sourceMappingURL=template-generator.js.map
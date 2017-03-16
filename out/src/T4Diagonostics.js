'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class T4Diagonostics {
    activate(context) {
        context.subscriptions.push(this);
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection();
    }
    dispose() {
        this.diagnosticCollection.clear();
        this.diagnosticCollection.dispose();
    }
    ParseErrors(error) {
        console.log("Errors " + error);
    }
    provideCodeActions(document, range, context, token) {
        return null;
    }
    runCodeAction(document, range, message) {
    }
}
exports.default = T4Diagonostics;
//# sourceMappingURL=T4Diagonostics.js.map
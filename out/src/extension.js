'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const template_generator_1 = require("./template-generator");
const T4Diagonostics_1 = require("./T4Diagonostics");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let templateGenerator = new template_generator_1.default();
    let t4Diagonostics = new T4Diagonostics_1.default();
    t4Diagonostics.ParseErrors("TESTING");
    t4Diagonostics.activate(context);
    templateGenerator.activate(context, t4Diagonostics);
    context.subscriptions.push(templateGenerator);
    context.subscriptions.push(t4Diagonostics);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
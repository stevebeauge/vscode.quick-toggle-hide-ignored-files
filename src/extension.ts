// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function getConfig(): boolean {
	const globalValue = vscode.workspace.getConfiguration("explorer").inspect("excludeGitIgnore")?.globalValue as boolean | undefined;
	return Boolean(globalValue);
}
function setConfig(value: boolean): Thenable<void> {
	return vscode.workspace.getConfiguration("explorer").update("excludeGitIgnore", value, vscode.ConfigurationTarget.Global);
}

let myStatusBarItem: vscode.StatusBarItem;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate({ subscriptions }: vscode.ExtensionContext) {

	subscriptions.push(vscode.commands.registerCommand('quick-toggle-hide-ignored-files.toggle', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from Quick toggle hide ignored files!');
		const current = getConfig();
		const newVal = !current;
		await setConfig(newVal);
	}));


	subscriptions.push(vscode.workspace.onDidChangeConfiguration((e) => {
		if (e.affectsConfiguration("explorer.excludeGitIgnore")) {
			//vscode.window.showInformationMessage(`explorer.excludeGitIgnore changed to ${getConfig()}`);
			updateStatusBarItem();
		}
	}));

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = 'quick-toggle-hide-ignored-files.toggle';
	updateStatusBarItem();
	myStatusBarItem.show();

	subscriptions.push(myStatusBarItem);

}

function updateStatusBarItem(): void {

	const excludeGitIgnoredIsEnabled = getConfig();
	myStatusBarItem.text = excludeGitIgnoredIsEnabled ? "$(eye-closed) ignored files" : "$(eye) ignored files";
	myStatusBarItem.tooltip= excludeGitIgnoredIsEnabled ? "Click to show ignored files" : "Click to hide ignored files";
}


// This method is called when your extension is deactivated
export function deactivate() { }

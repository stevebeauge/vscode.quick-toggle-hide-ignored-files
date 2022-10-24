import * as vscode from 'vscode';
export class ExcludeTreeProvider implements vscode.TreeDataProvider<ExcludeTreeItem> {

   

    private _onDidChangeTreeData: vscode.EventEmitter<ExcludeTreeItem | undefined | void> = new vscode.EventEmitter<ExcludeTreeItem | undefined | void>();

    readonly onDidChangeTreeData?: vscode.Event<void | ExcludeTreeItem | ExcludeTreeItem[] | null | undefined> | undefined = this._onDidChangeTreeData.event;

    constructor( private getIsExcluded : ()=>boolean) {

    }

    

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(
        element: ExcludeTreeItem
    ): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(
        element?: ExcludeTreeItem | undefined
    ): vscode.ProviderResult<ExcludeTreeItem[]> {
        const isExcluded = this.getIsExcluded();
        return [
            new ExcludeTreeItem(
                isExcluded
            )
        ];
    }

}

export class ExcludeTreeItem extends vscode.TreeItem {
    constructor(
        public isExcluded: boolean
    ) {
        super(`Git-ignored files ${isExcluded}`, vscode.TreeItemCollapsibleState.None);

        this.command = {
            command: 'quick-toggle-hide-ignored-files.toggle',
            title: `Toggle`
        };
    }
}
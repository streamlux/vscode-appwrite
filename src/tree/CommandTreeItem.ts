import { Command, TreeItem } from 'vscode';

export class CommandTreeItem extends TreeItem {
    constructor(item: TreeItem, command: Command) {
        super(item.label || 'Add label');
        Object.assign(this, item);
        this.command = command;
    }
}

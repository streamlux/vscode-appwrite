import { TreeItem, window } from "vscode";

export class EditableTreeItem extends TreeItem {
    public readonly setValue: (value: string) => Promise<void>;

    constructor(label: string, contextValuePrefix: string, public readonly value: string, setValue: (value: string) => Promise<void>) {
        super(label);
        this.setValue = setValue;
        this.contextValue = `editable_${contextValuePrefix}`;
    }

    public async prompt(): Promise<void> {
        const value = await window.showInputBox({ value: this.value });
        if (value !== undefined) {
            this.setValue(value);
        }
    }
}

import { TreeItem } from "vscode";

export abstract class EditableTreeItemBase<T> extends TreeItem {
    public abstract setValue(value: T): Promise<void>;

    constructor(contextValuePrefix: string, public readonly value: T, description?: string) {
        super(typeof value === "string" ? value : "No label");
        this.contextValue = `editable_${contextValuePrefix}`;
        this.description = description ?? contextValuePrefix;
    }

    public abstract prompt(): Promise<void>;
}

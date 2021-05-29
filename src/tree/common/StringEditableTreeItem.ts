import { InputBoxOptions, window } from "vscode";
import { EditableTreeItemBase } from "./EditableTreeItemBase";

export abstract class StringEditableTreeItemBase extends EditableTreeItemBase<string> {
    public abstract setValue(value: string): Promise<void>;
    public inputBoxOptions: InputBoxOptions;

    constructor(contextValuePrefix: string, public readonly value: string, description?: string) {
        super(contextValuePrefix, value, description);

        this.inputBoxOptions = {
            prompt: description,
        };
    }

    public async prompt(): Promise<void> {
        const value = await window.showInputBox({ value: this.value, ...this.inputBoxOptions });
        if (value !== undefined) {
            this.setValue(value);
        }
    }
}

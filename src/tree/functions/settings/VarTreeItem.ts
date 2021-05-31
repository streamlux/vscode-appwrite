import { InputBoxOptions, MarkdownString, window } from "vscode";
import { Function } from "../../../appwrite";
import { functionsClient } from "../../../client";
import { ext } from "../../../extensionVariables";
import { StringEditableTreeItemBase } from "../../common/editable/StringEditableTreeItem";
import { VarsTreeItem } from "./VarsTreeItem";

const tooltip = "Environment var";
const description = "Function name. Max length: 128 chars.";
const tooLongInvalid = "Value exceeds maximum length of 128 characters.";

export async function keyValuePrompt(keyInit?: string, valueInit?: string): Promise<{ key: string; value: string } | undefined> {
    const key = await window.showInputBox({ value: keyInit, prompt: "Environment variable name" });
    if (key === undefined) {
        return;
    }
    const value = await window.showInputBox({ value: valueInit, prompt: "Environment variable value" });
    if (value === undefined) {
        return;
    }
    return { key, value };
}

export class VarTreeItem extends StringEditableTreeItemBase {
    public readonly func: Function;

    inputBoxOptions: InputBoxOptions = {
        validateInput: (value) => {
            if (value.length > 128) {
                return tooLongInvalid;
            }
        },
        prompt: description,
    };

    public async setValue(value: string, key?: string): Promise<void> {
        if (value.length === 0) {
            return;
        }
        const newVars = { ...this.func.vars };
        newVars[this.key] = value;
        if (key) {
            delete newVars[this.key];
            newVars[key] = value;
        }
        await functionsClient?.update(this.func.$id, this.func.name, [], newVars, this.func.events, this.func.schedule, this.func.timeout);
        ext.tree?.functions?.refresh();
    }

    constructor(public readonly parent: VarsTreeItem, public readonly key: string, value: string) {
        super("var", value);
        this.func = parent.parent.func;
        this.tooltip = new MarkdownString(tooltip);
        this.label = `${key}=${value}`;
        this.description = undefined;
    }

    public async prompt(): Promise<void> {
        const keyval = await keyValuePrompt(this.key, this.value);
        if (keyval) {
            this.setValue(keyval.value, keyval.key);
        }
    }
}

import { InputBoxOptions, MarkdownString } from "vscode";
import { Function } from "../../../appwrite";
import { functionsClient } from "../../../client";
import { ext } from "../../../extensionVariables";
import { StringEditableTreeItemBase } from '../../common/StringEditableTreeItem';
import { FunctionSettingsTreeItem } from "./FunctionSettingsTreeItem";

const tooltip = "Function name";
const description = "Function name. Max length: 128 chars.";
const tooLongInvalid = "Value exceeds maximum length of 128 characters.";

export function validateFunctionName(value: string): string | undefined {
    if (value.length > 128) {
        return tooLongInvalid;
    }
}

export class NameTreeItem extends StringEditableTreeItemBase {
    public readonly func: Function;

    inputBoxOptions: InputBoxOptions = {
        validateInput: (value) => {
            if (value.length > 128) {
                return tooLongInvalid;
            }
        },
        prompt: description,
    };

    public async setValue(value: string): Promise<void> {
        if (value.length === 0) {
            return;
        }
        await functionsClient?.update(this.func.$id, value, [], this.func.vars, this.func.events, this.func.schedule, this.func.timeout);
        ext.tree?.functions?.refresh();
    }

    constructor(private readonly parent: FunctionSettingsTreeItem) {
        super("Name", parent.func.name);
        this.func = parent.func;
        this.tooltip = new MarkdownString(tooltip);
    }
}

import { QuickPickItem, window } from "vscode";
import { AppwriteProjectConfiguration } from "../settings";

export type CreateRuleWizardContext = {
    label: string;
    key: string;
    type: keyof typeof ruleTypes;
};

export async function createRuleWizard(): Promise<CreateRuleWizardContext | undefined> {
    const label = await window.showInputBox({
        placeHolder: "Label",
        prompt: "Attribute internal display name",
    });
    if (label === undefined) {
        return;
    }
    const key = await window.showInputBox({
        placeHolder: "Key",
        prompt: "Attribute key name. Used as the document JSON key in the Database API.",
    });
    if (key === undefined) {
        return;
    }
    const ruleTypeItems: QuickPickItem[] = Object.entries(ruleTypes).map(([label, description]) => ({
        label,
        description,
    }));

    const type = await window.showQuickPick(ruleTypeItems);

    if (type === undefined) {
        return;
    }
    if (label && key && type) {
        return { label, key, type: (type.label as unknown) as keyof typeof ruleTypes };
    }
    return undefined;
}

const ruleTypes = {
    text: "Any string value.",
    numeric: "Any integer or float value.",
    boolean: "Any boolean value.",
    wildcard: "Accept any value.",
    url: "Any valid URL.",
    email: "Any valid email address.",
    ip: "Any valid IP v4 or v6 address.",
    document:
        "Accept a valid child document. When using this type you are also required to pass the 'list' parameter with an array of the collections UID values of the document types you want to accept.",
};

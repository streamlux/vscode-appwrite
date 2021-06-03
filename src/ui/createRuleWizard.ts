import { QuickPickItem, window } from "vscode";
import { Collection, CollectionsList } from "../appwrite";
import { client } from "../client";
import { AppwriteSDK } from "../constants";
import AppwriteCall from "../utils/AppwriteCall";

export type CreateRuleWizardContext = {
    label: string;
    key: string;
    type: keyof typeof ruleTypes;
    default: any;
    required: boolean;
    array: boolean;
    list?: string[];
};

const ruleTypes = {
    text: "Any string value.",
    numeric: "Any integer or float value.",
    boolean: "Any boolean value.",
    wildcard: "Accept any value.",
    url: "Any valid URL.",
    email: "Any valid email address.",
    ip: "Any valid IP v4 or v6 address.",
    document: "Accept a valid child document from specified collection(s).",
};

type RuleType = keyof typeof ruleTypes;

export async function createRuleWizard(collection: Collection): Promise<CreateRuleWizardContext | undefined> {
    const label = await window.showInputBox({
        placeHolder: "Attribute label",
        prompt: "Attribute internal display name",
        validateInput: (value) => {
            if (value === "") {
                return "Label cannot be empty.";
            }
        },
    });
    if (label === undefined) {
        return;
    }
    const key = await window.showInputBox({
        placeHolder: "Attribute key name",
        prompt: "Attribute key name. Used as the document JSON key in the Database API.",
        ignoreFocusOut: true,
        validateInput: (value) => {
            if (value === "") {
                return "Key name cannot be empty.";
            }
        },
    });
    if (key === undefined) {
        return;
    }
    const ruleTypeItems: QuickPickItem[] = Object.entries(ruleTypes).map(([label, description]) => ({
        label,
        detail: description,
    }));

    const typeItem = await window.showQuickPick(ruleTypeItems, { placeHolder: "Rule value type." });
    const type: RuleType | undefined = (typeItem?.label as RuleType) ?? undefined;

    if (typeItem === undefined || type === undefined) {
        return;
    }

    let list: string[] | undefined = undefined;

    if (type === "document") {
        const databaseSdk = new AppwriteSDK.Database(client);
        const collectionsList = await AppwriteCall<CollectionsList, CollectionsList>(databaseSdk.listCollections());

        if (collectionsList === undefined) {
            window.showErrorMessage("Could not get collections list.");
            return;
        }

        if (collectionsList) {
            const collections = collectionsList.collections.filter((c) => c.$id !== collection.$id);
            const qpItems: QuickPickItem[] = collections.map((collection) => ({
                label: collection.name,
                description: collection.$id,
            }));

            const listInput = await window.showQuickPick(qpItems, {
                canPickMany: true,
                placeHolder: "Collections which contain valid child documents for this document attribute.",
                ignoreFocusOut: true,
            });
            list = listInput?.map((item) => item.description as string) ?? [];
        }
    }

    if (label === "document" && list === undefined) {
        return;
    }

    const array = await window.showQuickPick(["Primitive", "Array"], {
        placeHolder: "Decide if this rule is a primitive or an array of values.",
        ignoreFocusOut: true,
    });

    if (array === undefined) {
        return;
    }

    const required = await window.showQuickPick(["Required", "Optional"], {
        placeHolder: "Decide if this rule value is required in order to pass document validation.",
        ignoreFocusOut: true,
    });

    if (required === undefined) {
        return;
    }

    const defaultValue = await window.showInputBox({
        placeHolder: "Default value (press Enter to skip)",
        prompt: "Default value for this rule type. Make sure that the default value is able to pass validation in order to avoid errors when skipping optional values.",
        ignoreFocusOut: true,
    });

    if (defaultValue === undefined) {
        return;
    }

    if (label && key && type) {
        return {
            label,
            key,
            type,
            default: defaultValue,
            array: array === "Array",
            required: required === "Required",
            list,
        };
    }

    return undefined;
}

import { window } from "vscode";
import { DialogResponses } from "./DialogResponses";

export async function confirmDialog(text: string): Promise<boolean> {
    const response = await window.showWarningMessage(text, { modal: true }, DialogResponses.yes, DialogResponses.cancel);
    return response === DialogResponses.yes;
}

import { window } from "vscode";
import { usersClient } from '../../client';
import { ext } from '../../extensionVariables';

export async function createUser(): Promise<void> {
    const email = await window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: "jane.doe@hotmail.com",
        prompt: "New user email address",
    });
    if (email === undefined) {
        return;
    }
    const password = await window.showInputBox({
        ignoreFocusOut: true,
        password: true,
        prompt: "Enter user password",
        validateInput: (value) => {
            if (value.length <= 6) {
                return "Password must be at least 6 characters long.";
            }
            if (value.length > 32) {
                return "Password must be less than 32 characters long.";
            }
        },
    });
    if (password === undefined) {
        return;
    }
    const name = await window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: "",
        prompt: "New user name (optional)",
    });

    await usersClient.createNewUser({
        email,
        password,
        name: name === "" ? undefined : name,
    });

    ext.tree?.users?.refresh();
}

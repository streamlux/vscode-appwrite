import { ext } from "../../extensionVariables";

export async function refreshUsersList(): Promise<void> {
    ext.tree?.users?.refresh();
}

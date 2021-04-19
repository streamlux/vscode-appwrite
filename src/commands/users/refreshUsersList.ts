import { ext } from "../../extensionVariables";

export async function refreshUsersList() {
    ext.tree?.users?.refresh();
}

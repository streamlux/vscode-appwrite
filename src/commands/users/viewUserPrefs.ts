import { UserPrefsTreeItem } from "../../tree/users/properties/UserPrefsTreeItem";
import { openReadOnlyJson } from "../../ui/openReadonlyContent";

export async function viewUserPrefs(item: UserPrefsTreeItem) {
    const prefs = item.parent.user.prefs;

    await openReadOnlyJson(
        { label: `prefs`, fullId: `${item.parent.user.$id}.prefs` },
        prefs
    );
}

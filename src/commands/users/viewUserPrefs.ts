import { UserPrefsTreeItem } from "../../tree/users/properties/UserPrefsTreeItem";
import { UserTreeItem } from '../../tree/users/UserTreeItem';
import { openReadOnlyJson } from "../../ui/openReadonlyContent";

export async function viewUserPrefs(item: UserPrefsTreeItem | UserTreeItem):  Promise<void> {
    const userItem = item instanceof UserPrefsTreeItem ? item.parent : item;
    const prefs = userItem.user.prefs;

    await openReadOnlyJson(
        { label: `prefs`, fullId: `${userItem.user.$id}.prefs` },
        prefs
    );
}

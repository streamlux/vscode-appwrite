import { window } from "vscode";
import { initAppwriteClient } from "../../client";
import { setActiveProjectId } from '../../settings';
import { ProjectTreeItem } from "../../tree/projects/ProjectTreeItem";

export async function setActiveProject(treeItem: ProjectTreeItem) {
    if (treeItem === undefined) {
        return;
    }

    if (!(treeItem instanceof ProjectTreeItem)) {
        return;
    }

    await setActiveProjectId(treeItem.project.projectId);
}

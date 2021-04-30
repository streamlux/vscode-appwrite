import { window } from "vscode";
import { initAppwriteClient } from "../../client";
import { removeProjectConfig } from '../../settings';
import { ProjectTreeItem } from '../../tree/projects/ProjectTreeItem';
import { addProjectWizard } from "../../ui/AddProjectWizard";

export async function removeProject(project: ProjectTreeItem | string) {
    if (typeof project === 'string') {
        await removeProjectConfig(project);
        return;
    }

    await removeProjectConfig(project.project.projectId);
}

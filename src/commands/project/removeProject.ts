import { removeProjectConfig } from "../../settings";
import { ProjectTreeItem } from "../../tree/projects/ProjectTreeItem";

export async function removeProject(project: ProjectTreeItem | string) {
    if (typeof project === "string") {
        await removeProjectConfig(project);
        return;
    }

    await removeProjectConfig(project.project.projectId);
}

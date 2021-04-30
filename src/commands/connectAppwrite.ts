import { createAppwriteClient } from "../client";
import { addProjectConfiguration } from '../settings';
import { addProjectWizard } from "../ui/AddProjectWizard";
import { refreshTree } from '../utils/refreshTree';

export async function connectAppwrite() {
    const projectConfiguration = await addProjectWizard();
    if (projectConfiguration) {
        addProjectConfiguration(projectConfiguration);
        createAppwriteClient(projectConfiguration);
        refreshTree();
    }
}

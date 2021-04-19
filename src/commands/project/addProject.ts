import { window } from "vscode";
import { initAppwriteClient } from "../../client";
import { addProjectWizard } from "../../ui/AddProjectWizard";

export async function addProject() {
    const projectConfiguration = await addProjectWizard();

    if (projectConfiguration) {
        initAppwriteClient(projectConfiguration);
    }

    window.showInformationMessage("Connected to Appwrite project.");
}

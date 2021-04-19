import { workspace } from 'vscode';

export type AppwriteProjectConfiguration = {
    nickname?: string;
    endpoint: string;
    console?: string;
    projectId: string;
    secret: string;
};

export async function getDefaultProject(): Promise<AppwriteProjectConfiguration | undefined> {
    const projects = await getAppwriteProjects();
    return projects?.[0] ?? undefined;
}

export async function getAppwriteProjects(): Promise<AppwriteProjectConfiguration[]> {
    const configuration = workspace.getConfiguration('appwrite');
    const projects = configuration.get('projects');
    if (projects === undefined) {
        configuration.update('projects', []);
        return [];
    }
    return projects as AppwriteProjectConfiguration[];
}

export async function addProjectConfiguration(projectConfig: AppwriteProjectConfiguration): Promise<void> {
    const configuration = workspace.getConfiguration('appwrite');
    const projects = await getAppwriteProjects();
    await configuration.update('projects', [...projects, projectConfig], true);
}

import { openUrl } from '../utils/openUrl';

const appwriteDocsUrl = 'https://appwrite.io/docs';

export async function openDocumentation(): Promise<void> {
    await openUrl(appwriteDocsUrl);
}

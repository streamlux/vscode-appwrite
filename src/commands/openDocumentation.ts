import { openUrl } from '../utils/openUrl';

const documentationLinks = {
    home: 'https://appwrite.io/docs',
    users: 'https://appwrite.io/docs/server/users',
    database: 'https://appwrite.io/docs/client/database',
    health: 'https://appwrite.io/docs/server/health'
};

type DocsPage = keyof typeof documentationLinks;

export async function openDocumentation(page?: DocsPage): Promise<void> {
    await openUrl(documentationLinks[page || 'home']);
}

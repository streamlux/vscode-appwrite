import { refreshTree } from '../../utils/refreshTree';

export async function refreshCollectionsList(): Promise<void> {
    refreshTree('database');
}

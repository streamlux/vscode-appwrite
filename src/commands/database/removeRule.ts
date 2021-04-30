import { databaseClient } from '../../client';
import { RuleTreeItem } from '../../tree/database/settings/RuleTreeItem';
import { refreshTree } from '../../utils/refreshTree';

export async function removeRule(ruleItem: RuleTreeItem): Promise<void> {
    if (!databaseClient) {
        return;
    }
    const rule = ruleItem.rule;
    const collection = ruleItem.parent.parent.collection;
    await databaseClient.removeRule(collection, rule);
    refreshTree('database');
}

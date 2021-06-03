import { CreatedRule } from "../../appwrite";
import { databaseClient } from "../../client";
import { RulesTreeItem } from "../../tree/database/settings/RulesTreeItem";
import { createRuleWizard } from "../../ui/createRuleWizard";
import { refreshTree } from '../../utils/refreshTree';

export async function createRule(rulesTreeItem: RulesTreeItem): Promise<void> {

    if (!databaseClient) {
        return;
    }

    const collection = rulesTreeItem.parent.collection;
    const ruleContext = await createRuleWizard(collection);

    if (ruleContext) {
        const newRule: CreatedRule = {
            ...ruleContext,
            type: ruleContext.type,
        };

        databaseClient.createRule(collection, newRule);

        await rulesTreeItem.refresh();
        refreshTree("database");
    }
}

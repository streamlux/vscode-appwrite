import { CreatedRule } from "../../appwrite";
import { databaseClient } from "../../client";
import { RulesTreeItem } from "../../tree/database/settings/RulesTreeItem";
import { createRuleWizard } from "../../ui/createRuleWizard";
import { refreshTree } from '../../utils/refreshTree';

export async function createRule(rulesTreeItem: RulesTreeItem): Promise<void> {
    const ruleContext = await createRuleWizard();
    const collection = rulesTreeItem.parent.collection;

    if (ruleContext) {
        const newRule: CreatedRule = {
            ...ruleContext,
            type: ruleContext.type,
            required: true,
            array: false,
        };

        databaseClient.createRule(collection, newRule);

        await rulesTreeItem.refresh();
        refreshTree("database");
    }
}

import dayjs = require('dayjs');
import { MarkdownString, ThemeColor, ThemeIcon, TreeItem } from "vscode";
import { Execution, ExecutionStatus } from "../../appwrite";
import { functionsClient } from "../../client";
import { ext } from "../../extensionVariables";
import { ExecutionsTreeItem } from "./ExecutionsTreeItem";

const executionStatusIcons: Record<ExecutionStatus, ThemeIcon> = {
    processing: new ThemeIcon("loading"),
    waiting: new ThemeIcon("circle-outline"),
    completed: new ThemeIcon("circle-filled", new ThemeColor("testing.iconPassed")),
    failed: new ThemeIcon("circle-filled", new ThemeColor("testing.iconFailed")),
};

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export class ExecutionTreeItem extends TreeItem {
    public isAutoRefreshing: boolean = false;
    private refreshCount: number = 0;

    constructor(public readonly parent: ExecutionsTreeItem, private readonly execution: Execution) {
        super(execution.$id);
        this.label = this.getLabel(execution);
        this.iconPath = executionStatusIcons[execution.status];
        const md = `Id: ${execution.$id}  \nCreated: ${this.getCreated(execution)}  \nTrigger: ${execution.trigger}`;
        this.tooltip = new MarkdownString(md);
        this.description = execution.trigger;
        this.isAutoRefreshing = execution.status === "processing" || execution.status === "waiting";
        this.autoRefresh();
    }

    async autoRefresh(): Promise<void> {
        if (!this.isAutoRefreshing) {
            return;
        }
        this.refreshCount++;
        ext.outputChannel.appendLog("Refreshing execution.");
        const execution = await functionsClient?.getExecution(this.parent.parent.func.$id, this.execution.$id);

        if (!execution) {
            ext.outputChannel.appendLog("Execution is undefined");
            this.isAutoRefreshing = false;
            return;
        }

        this.iconPath = executionStatusIcons[execution.status];
        this.label = this.getLabel(execution);
        this.isAutoRefreshing = execution.status === "processing" || execution.status === "waiting";

        ext.tree?.functions?.refreshChild(this);
        await sleep(1000);
        this.autoRefresh();
    }

    getLabel(execution: Execution): string {
        if (execution.status === "completed") {
            return `${this.getCreated(execution)} (${execution.time.toPrecision(2)}s)`;
        }
        return `${this.getCreated(execution)} (${execution.status})`;
    }

    getCreated(execution: Execution): string {
        return dayjs(execution.dateCreated).format("LTS");
    }



    contextValue = "tag";
}

import { MarkdownString, ThemeColor, ThemeIcon, TreeItem } from "vscode";
import { Execution, ExecutionStatus } from "../../../appwrite";
import { functionsClient } from "../../../client";
import { ext } from "../../../extensionVariables";
import { msToDate } from "../../../utils/date";
import { sleep } from '../../../utils/sleep';
import { ExecutionsTreeItem } from "./ExecutionsTreeItem";

const executionStatusIcons: Record<ExecutionStatus, ThemeIcon> = {
    processing: new ThemeIcon("loading"),
    waiting: new ThemeIcon("circle-outline"),
    completed: new ThemeIcon("circle-filled", new ThemeColor("testing.iconPassed")),
    failed: new ThemeIcon("circle-filled", new ThemeColor("testing.iconFailed")),
};

export class ExecutionTreeItem extends TreeItem {
    public isAutoRefreshing: boolean = false;
    private refreshCount: number = 0;

    constructor(public readonly parent: ExecutionsTreeItem, public execution: Execution) {
        super(execution.$id);
        this.label = this.getLabel(execution);
        this.iconPath = executionStatusIcons[execution.status];
        const md = `Id: ${execution.$id}  \nCreated: ${this.getCreated(execution)}  \nTrigger: ${execution.trigger}`;
        this.tooltip = new MarkdownString(md);
        this.description = execution.trigger;
        this.contextValue = this.getContextValue(execution);
        this.isAutoRefreshing = execution.status === "processing" || execution.status === "waiting";
        if (this.isAutoRefreshing) {
            this.autoRefresh();
        }
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
        this.execution = execution;
        this.contextValue = this.getContextValue(execution);
        this.iconPath = executionStatusIcons[execution.status];
        this.label = this.getLabel(execution);
        this.isAutoRefreshing = execution.status === "processing" || execution.status === "waiting";
        ext.tree?.functions?.refreshChild(this);
        await sleep(1000);
        this.autoRefresh();
    }

    getLabel(execution: Execution): string {
        if (execution.status === "completed" || execution.status === "failed") {
            return `${this.getCreated(execution)} (${this.getExecutionTime(execution)}s)`;
        }
        return `${this.getCreated(execution)} (${execution.status})`;
    }

    getExecutionTime(execution: Execution): string {
        return execution.time.toPrecision(2);
    }

    getContextValue(execution: Execution): string {
        if (execution.status === "completed" || execution.status === "failed") {
            if (execution.stderr === "" && execution.stdout === "") {
                return "execution_noErrorOrOutput";
            }
            if (execution.stderr === "") {
                return "execution_outputOnly";
            }
            if (execution.stdout === "") {
                return "execution_errorOnly";
            }
        }
        return "execution";
    }

    getCreated(execution: Execution): string {
        return msToDate(execution.dateCreated);
    }
}

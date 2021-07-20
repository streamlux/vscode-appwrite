import * as vscode from "vscode";
import { ext } from "../../extensionVariables";
import { HealthTreeItem } from "./HealthTreeItem";
import * as dayjs from "dayjs";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
import { Health, healthTooltips } from "../../appwrite/Health";
import { AppwriteHealth, Client } from "../../appwrite";
import { promiseWithTimeout } from "../../utils/promiseWithTimeout";
import { AppwriteTreeItemBase } from '../../ui/AppwriteTreeItemBase';
import { ProjectTreeItem } from '../projects/ProjectTreeItem';
dayjs.extend(localizedFormat);

export class HealthParentTreeItem extends AppwriteTreeItemBase<ProjectTreeItem> {

    private readonly healthClient: Health;

    constructor(parent: ProjectTreeItem, sdk: Client) {
        super(parent, 'Health');
        this.healthClient = new Health(sdk);
        this.iconPath = new vscode.ThemeIcon('pulse');
    }

    private _onDidChangeTreeData: vscode.EventEmitter<HealthTreeItem | undefined | void> = new vscode.EventEmitter<
        HealthTreeItem | undefined | void
    >();

    label = 'Health';

    private lastChecked: Date = new Date();

    readonly onDidChangeTreeData: vscode.Event<HealthTreeItem | undefined | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: HealthTreeItem): vscode.TreeItem {
        return element;
    }

    collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;

    async getChildren(element?: HealthTreeItem): Promise<vscode.TreeItem[]> {
        // get children for root
        if (element === undefined) {
            try {
                const health = await promiseWithTimeout<Partial<AppwriteHealth> | undefined>(
                    10000,
                    async () => {
                        try {
                            return await this.healthClient?.checkup();
                        } catch (e) {
                            ext.outputChannel?.append('Error: ' + e.message);
                            vscode.window.showErrorMessage('Could not connect to Appwrite project');
                        }
                    },
                    "Health request timed out"
                );
                if (health === undefined) {
                    return [];
                }
                ext.outputChannel?.append(JSON.stringify(health, null, 4));
                const healthItems = Object.entries(health).map(([service, status]) => {
                    return new HealthTreeItem(service, status, healthTooltips[service as keyof AppwriteHealth]);
                });
                this.lastChecked = new Date();
                return [
                    {
                        label: `Updated at ${dayjs(this.lastChecked).format("LTS")}`,
                    },
                    ...healthItems,
                ];
            } catch (e) {
                //
            }
        }
        return [];
    }
}

import { QuickPickItem, QuickPickOptions, window } from "vscode";
import { EditableTreeItemBase } from "./EditableTreeItemBase";

export abstract class EnumEditableTreeItemBase extends EditableTreeItemBase<string[]> {
    public abstract options: string[] | QuickPickItem[];

    public quickPickOptions: QuickPickOptions;

    constructor(contextValuePrefix: string, public readonly value: string[], description?: string) {
        super(contextValuePrefix, value, description);
        this.quickPickOptions = {};
    }

    public async prompt(): Promise<void> {

        const value = await window.showQuickPick(
            this.options.map<QuickPickItem>((option: QuickPickItem | string): QuickPickItem => {
                if (typeof option === "string") {
                    return { label: option, picked: this.value.includes(option) };
                }
                const picked = this.value.includes(option.label);
                return { ...option, picked, alwaysShow: picked };
            }).sort((a, b) => {
                if (a.picked) {
                    return -1;
                }
                if (b.picked) {
                    return 1;
                }
                return 0;
            }),
            { ...this.quickPickOptions, canPickMany: true }
        );
        if (value !== undefined) {
            this.setValue(value.map((item) => item.label));
        }
    }
}

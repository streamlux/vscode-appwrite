import { ThemeIcon } from 'vscode';
import { ChildTreeItem } from '../ChildTreeItem';
import { DocumentsTreeItem } from './DocumentsTreeItem';

export class DocumentTreeItem extends ChildTreeItem<DocumentsTreeItem> {
    constructor(parent: DocumentsTreeItem, public readonly document: Record<string, any>) {
        super(parent, {
            label: document['$id'],
        });
    }
    iconPath = new ThemeIcon('json');
    contextValue = 'document';
}

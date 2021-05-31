import { Progress } from 'vscode';

export type ProgressMessage = Progress<{
    message?: string | undefined;
    increment?: number | undefined;
}>;

import { window } from 'vscode';

export const promiseWithTimeout = <T>(timeoutMs: number, promise: () => Promise<T>, failureMessage?: string): Promise<T> => {
    let timeoutHandle: NodeJS.Timeout;
    const timeoutPromise = new Promise<never>((resolve, reject) => {
        timeoutHandle = setTimeout(() => window.showErrorMessage(failureMessage ?? 'Request timed out'), timeoutMs);
    });

    return Promise.race([promise(), timeoutPromise]).then((result) => {
        clearTimeout(timeoutHandle);
        return result;
    });
};

/* eslint-disable @typescript-eslint/ban-types */
import { window } from "vscode";
import { Error } from "../appwrite";
import { ext } from "../extensionVariables";

export default function AppwriteCall<T, R = T>(
    promise: Promise<object>,
    onSuccess?: (success: T) => R,
    onError?: (error: Error) => R
): Promise<R | undefined> {
    return promise.then(
        (successResp) => {
            ext.outputChannel?.appendLog(`Appwrite call success:`);
            if (onSuccess) {
                return onSuccess((successResp as unknown) as T);
            }
            return successResp as unknown as R;
        },
        (errResp: Error) => {
            if (onError) {
                onError(errResp as Error);
                return undefined;
            }

            window.showErrorMessage(errResp.message);
            ext.outputChannel?.appendLog(errResp.message);
            return undefined;
        }
    );
}

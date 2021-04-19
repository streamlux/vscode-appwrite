import { MessageItem } from "vscode";

export namespace DialogResponses {
    export const yes: MessageItem = { title: "Yes" };
    export const no: MessageItem = { title: "No" };
    export const cancel: MessageItem = { title: "Cancel", isCloseAffordance: true };
    export const deleteResponse: MessageItem = { title: "Delete" };
    export const learnMore: MessageItem = { title: "Learn more" };
    export const dontWarnAgain: MessageItem = { title: "Don't warn again" };
    export const skipForNow: MessageItem = { title: "Skip fo now" };
    export const upload: MessageItem = { title: "Upload" };
    export const alwaysUpload: MessageItem = { title: "Always uploa" };
    export const dontUpload: MessageItem = { title: "Don' upload", isCloseAffordance: true };
    export const reportAnIssue: MessageItem = { title: "Report a issue" };
}

import { ReadStream } from 'fs';
import { Stream } from 'node:stream';

export type Token = {
    /**
     * Token ID.
     */
    $id: string;
    /**
     * User ID.
     */
    userId: string;
    /**
     * Token secret key. This will return an empty string unless the response is returned using an API key or as part of a webhook payload.
     */
    secret: string;
    /**
     * Token expiration date in Unix timestamp.
     */
    expire: number;
};

export type User = {
    /**
     * User ID.
     */
    $id: string;
    /**
     * User name.
     */
    name: string;
    /**
     * User registration date in Unix timestamp.
     */
    registration: number;
    /**
     * User status. 0 for Unactivated, 1 for active and 2 is blocked.
     * @deprecated according to developers
     */
    status: number;
    /**
     * User email address.
     */
    email: string;
    /**
     * Email verification status.
     */
    emailVerification: boolean;
    /**
     * User preferences as a key-value object
     */
    prefs: Record<string, unknown>;
};

export type UsersList = {
    /**
     * Total sum of items in the list.
     */
    sum: number;
    /**
     * List of users.
     */
    users: User[];
};

export type Error = {
    /**
     * Error message.
     */
    message: string;

    /**
     * Error code.
     */
    code: string;

    /**
     * Server version number.
     */
    version: string;
};

export type Session = {
    /**
     * Session ID.
     */
    $id: string;
    /**
     * User ID.
     */
    userId: string;
    /**
     * Session expiration date in Unix timestamp.
     */
    expire: number;
    /**
     * IP in use when the session was created.
     */
    ip: string;
    /**
     * Returns true if this the current user session.
     */
    current: boolean;
} & ClientInfo;

export type Log = {
    /**
     * Event name.
     */
    event: string;
    /**
     * IP session in use when the session was created.
     */
    ip: string;
    /**
     * Log creation time in Unix timestamp.
     */
    time: number;
} & ClientInfo;

type ClientInfo = {
    /**
     * Operating system code name. View list of possible values:
     * https://github.com/appwrite/appwrite/blob/master/docs/lists/os.json
     */
    osCode: string;
    /**
     * Operating system name.
     */
    osName: string;
    /**
     * Operating system version.
     */
    osVersion: string;
    /**
     * Client type.
     */
    clientType: string;
    /**
     * Client code name. View list of possible values:
     * https://github.com/appwrite/appwrite/blob/master/docs/lists/clients.json
     */
    clientCode: string;
    /**
     * Client name.
     */
    clientName: string;
    /**
     * Client version.
     */
    clientVersion: string;
    /**
     * Client engine name.
     */
    clientEngine: string;
    /**
     * Client engine version.
     */
    clientEngineVersion: string;
    /**
     * Device name.
     */
    deviceName: string;
    /**
     * Device brand name.
     */
    deviceBrand: string;
    /**
     * Device model name.
     */
    deviceModel: string;
    /**
     * Country two-character ISO 3166-1 alpha code.
     */
    countryCode: string;
    /**
     * Country name.
     */
    countryName: string;
};

export type Team = {
    /**
     * Team ID.
     */
    $id: string;
    /**
     * Team name.
     */
    name: string;
    /**
     * Team creation date in Unix timestamp.
     */
    dateCreated: number;
    /**
     * Total sum of team members.
     */
    sum: number;
};

type Membership = {
    /**
     * Membership ID.
     */
    $id: string;

    /**
     * User ID.
     */
    userId: string;

    /**
     * Team ID.
     */
    teamId: string;

    /**
     * User name.
     */
    name: string;

    /**
     * User email address.
     */
    email: string;

    /**
     * Date, the user has been invited to join the team in Unix timestamp.
     */
    invited: number;

    /**
     * Date, the user has accepted the invitation to join the team in Unix timestamp.
     */
    joined: number;

    /**
     * User confirmation status, true if the user has joined the team or false otherwise.
     */
    confirm: boolean;

    /**
     * User list of roles
     */
    roles: string[];
};

export type FilesList = {
    sum: number;
    files: File[];
};

export type File = {
    $id: string;
    $permissions: Permissions;
    name: string;
    dateCreated: number;
    signature: string;
    mimeType: string;
    sizeOriginal: number;
};

export type Collection = {
    $id: string;
    $permissions: Permissions;
    name: string;
    dateCreated: number;
    dateUpdated: number;
    rules: Rule[];
};

export type CreatedCollection = Partial<Collection> & Pick<Collection, "name">;

export type CollectionsList = {
    sum: number;
    collections: Collection[];
};

export type CreatedRule = Omit<Rule, "$id" | "$collection">;

export type Rule = {
    $id: string;
    $collection: string;
    type: string;
    key: string;
    label: string;
    default?: any;
    required: boolean;
    array: boolean;
    list?: string[];
};

export type Permissions = {
    read: string[];
    write: string[];
}

export type Client = {
    // Your API Endpoint
    setEndpoint: (endpoint: string) => Client;
    // Your project ID
    setProject: (projectId: string) => Client;
    // Your secret API key
    setKey: (key: string) => Client;
    setSelfSigned: (value: boolean) => void;
};
export type UsersClient = {
    delete: (id: string) => Promise<any>;
    deleteSessions: (id: string) => Promise<any>;
    create: (email: string, password: string, name?: string) => Promise<any>;
    getLogs: (id: string) => Promise<Log[]>;
};

export type DatabaseClient = {
    listCollections: () => Promise<any>;
    listDocuments: (collectionId: string) => Promise<any>;
    updateCollection: (collectionId: string, name: string, read: string[], write: string[], rules?: (Rule | CreatedRule)[]) => Promise<any>;
    deleteCollection: (collectionId: string) => Promise<any>;
    getCollection: (collectionId: string) => Promise<any>;
    deleteDocument: (collectionId: string, documentId: string) => Promise<any>;
    createCollection: (name: string, read: string[], write: string[], rules: Rule[]) => Promise<any>;
};

export type DocumentsList = {
    sum: number;
    documents: any[];
};

type GetHealth = () => any;

export type HealthClient = {
    get: GetHealth;
    getDB: GetHealth;
    getCache: GetHealth;
    getTime: GetHealth;
    getQueueWebhooks: GetHealth;
    getQueueTasks: GetHealth;
    getQueueLogs: GetHealth;
    getQueueUsage: GetHealth;
    getQueueCertificates: GetHealth;
    getQueueFunctions: GetHealth;
    getStorageLocal: GetHealth;
    getAntiVirus: GetHealth;
};

export type AppwriteHealth = {
    HTTP: any;
    DB: any;
    Cache: any;
    Time: any;
    QueueWebhooks: any;
    QueueTasks: any;
    QueueLogs: any;
    QueueUsage: any;
    QueueCertificates: any;
    QueueFunctions: any;
    StorageLocal: any;
    AntiVirus: any;
};

export type StorageClient = {
    createFile: (file: any, read?: string[], write?: string[]) => Promise<any>;
    listFiles: () => Promise<any>;
    getFile: (fileId: string) => Promise<any>;
};

type Vars = Record<string, any>;

export type Function = {
  '$id': string;
  '$permissions': Permissions;
  name: string;
  dateCreated: number;
  dateUpdated: number;
  status: string;
  env: string;
  tag: string;
  vars: Vars;
  events: string[];
  schedule: string;
  scheduleNext: number;
  schedulePrevious: number;
  timeout: number;
}

export type FunctionsList = {
    sum: number;
    functions: Function[];
}

export type Tag = {
  '$id': string;
  functionId: string;
  dateCreated: number;
  command: string;
  size: string;
};

export type TagList = {
    sum: number;
    tags: Tag[];
}

export type ExecutionStatus = "waiting" | "processing" | "completed" | "failed";

export type Execution = {
  '$id': string;
  functionId: string;
  dateCreated: number;
  trigger: string;
  status: ExecutionStatus;
  exitCode: number;
  stdout: string;
  stderr: string;
  time: number;
};

export type ExecutionList = {
    sum: number;
    executions: Execution[];
};

export type Search = {
    search?: string;
    limit?: number;
    offset?: number;
    orderType?: 'ASC' | 'DESC';
};

export type FunctionsClient = {
    create: (name: string, execute: string[], env: string, vars?: Vars, events?: string[], schedule?: string, timeout?: number) => Promise<any>;
    list: (search?: string, offset?: number, limit?: number, orderType?: 'ASC' | 'DESC') => Promise<any>;
    get: (functionId: string) => Promise<any>;
    update: (functionId: string, name: string, execute: string[], vars?: Vars, events?: string[], schedule?: string, timeout?: number) => Promise<any>;
    updateTag: (functionId: string, tagId: string) => Promise<any>;
    delete: (functionId: string) => Promise<any>;
    createTag: (id: string, command: string, code: ReadStream) => Promise<any>;
    listTags: (id: string, search?: string, limit?: number, offset?: number, orderType?: 'ASC' | 'DESC') => Promise<any>;
    getTag: (functionId: string, tagId: string) => Promise<any>;
    deleteTag: (functionId: string, tagId: string) => Promise<any>;
    createExecution: (functionId: string, data?: string) => Promise<any>;
    listExecutions: (functionId: string, search?: string, limit?: number, offset?: number, orderType?: 'ASC' | 'DESC') => Promise<any>;
    getExecution: (functionId: string, executionId: string) => Promise<any>;
}

export type SDK = {
    Client: new () => Client;

    Users: new (client: Client) => UsersClient;
    Health: new (client: Client) => HealthClient;
    Database: new (client: Client) => DatabaseClient;
    Storage: new (client: Client) => StorageClient;
    Functions: new (client: Client) => FunctionsClient;
};

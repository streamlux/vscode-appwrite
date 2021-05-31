import { Client, Execution, ExecutionList, FunctionsClient, Tag, TagList, Vars } from "../appwrite";
import { AppwriteSDK } from '../constants';
import AppwriteCall from '../utils/AppwriteCall';
import { ReadStream } from 'node:fs';

export class Functions {
    public readonly functions: FunctionsClient;

    constructor(client: Client) {
        this.functions = new AppwriteSDK.Functions(client);
    }

    public async create(name: string, execute: string[], env: string, vars?: Vars, events?: string[], schedule?: string, timeout?: number): Promise<any> {
        return await AppwriteCall(this.functions.create(name, execute, env, vars, events, schedule, timeout));
    }
    public async list(search?: string, offset?: number, limit?: number, orderType?: 'ASC' | 'DESC'): Promise<any> {
        return await AppwriteCall(this.functions.list(search, offset, limit, orderType));
    }
    public async get(functionId: string): Promise<any> {
        return await AppwriteCall(this.functions.get(functionId));
    }
    public async update(functionId: string, name: string, execute: string[], vars?: Vars, events?: string[], schedule?: string, timeout?: number): Promise<any> {
        return await AppwriteCall(this.functions.update(functionId, name, execute, vars, events, schedule, timeout));
    }
    public async updateTag(functionId: string, tagId: string): Promise<any> {
        return await AppwriteCall(this.functions.updateTag(functionId, tagId));
    }
    public async delete(functionId: string): Promise<void> {
        return await AppwriteCall(this.functions.delete(functionId));
    }
    public async createTag(functionId: string, command: string, code: ReadStream): Promise<Tag | undefined> {
        return await AppwriteCall(this.functions.createTag(functionId, command, code));
    }
    public async listTags(id: string, search?: string, limit?: number, offset?: number, orderType?: 'ASC' | 'DESC'): Promise<TagList | undefined> {
        return await AppwriteCall<TagList>(this.functions.listTags(id, search, offset, limit, orderType));
    }
    public async getTag(functionId: string, tagId: string): Promise<any> {
        return await AppwriteCall(this.functions.getTag(functionId, tagId));
    }
    public async deleteTag(functionId: string, tagId: string): Promise<void> {
        return await AppwriteCall(this.functions.deleteTag(functionId, tagId));
    }
    public async createExecution(functionId: string, data?: string): Promise<Execution | undefined> {
        return await AppwriteCall(this.functions.createExecution(functionId, data));
    }
    public async listExecutions(functionId: string, search?: string, limit?: number, offset?: number, orderType?: 'ASC' | 'DESC'): Promise<ExecutionList | undefined> {
        return await AppwriteCall(this.functions.listExecutions(functionId, search, offset, limit, orderType));
    }
    public async getExecution(functionId: string, executionId: string): Promise<Execution | undefined> {
        return await AppwriteCall(this.functions.getExecution(functionId, executionId));
    }
}

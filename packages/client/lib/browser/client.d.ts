import SpecterRequest from "./request";
import SpecterResponse from "./response";
declare type DefaultRequest = SpecterRequest<any, any, any>;
declare type DefaultResponse = SpecterResponse<any, any>;
export default class SpecterClient {
    base: string;
    fetchOptions: {
        headers?: Record<string, string>;
    } & Record<string, any>;
    constructor(options: {
        base: string;
        fetchOptions: {
            headers?: Record<string, string>;
        } & Record<string, any>;
    });
    private createPath;
    private executeRequest;
    execute<Response extends DefaultResponse>(request: DefaultRequest): Promise<Response>;
    create<Response extends DefaultResponse>(request: DefaultRequest): Promise<Response>;
    read<Response extends DefaultResponse>(request: DefaultRequest): Promise<Response>;
    update<Response extends DefaultResponse>(request: DefaultRequest): Promise<Response>;
    delete<Response extends DefaultResponse>(request: DefaultRequest): Promise<Response>;
    exists(request: DefaultRequest): Promise<boolean>;
}
export {};

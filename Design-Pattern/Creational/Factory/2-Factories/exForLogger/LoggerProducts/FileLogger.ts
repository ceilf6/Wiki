import { ILogger } from "./ILogger";

export class FileLogger implements ILogger {
    log(message: string): void {
        console.log(`Log to file: ${message}`);
    }
}
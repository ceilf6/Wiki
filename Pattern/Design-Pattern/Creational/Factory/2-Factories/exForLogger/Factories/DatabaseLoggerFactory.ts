import { DatabaseLogger } from "../LoggerProducts/DatabaseLogger";
import { ILogger } from "../LoggerProducts/ILogger";
import { IFactory } from "./IFactories";

export default class DatabaseLoggerFactory implements IFactory {
    createLogger(): ILogger {
        return new DatabaseLogger()
    }
}
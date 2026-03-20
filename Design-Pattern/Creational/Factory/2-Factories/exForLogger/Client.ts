import FilerLoggerFactory from "./Factories/FileLoggerFactory";
import DatabaseLoggerFactory from "./Factories/DatabaseLoggerFactory";

const fileLoggerFactory = new FilerLoggerFactory()
const fileLogger = fileLoggerFactory.createLogger()
fileLogger.log('ceilf6')

const databaseLoggerFactory = new DatabaseLoggerFactory()
const databaseLogger = databaseLoggerFactory.createLogger()
databaseLogger.log('ceilf6')
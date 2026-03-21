import { Server } from "./02-Server";
import Proxy from "./03-Proxy";

const server = new Server()
const proxyServer = new Proxy(server, 1)
proxyServer.operation()

const proxyServerWithoutPermission = new Proxy(server, 0)
proxyServerWithoutPermission.operation()
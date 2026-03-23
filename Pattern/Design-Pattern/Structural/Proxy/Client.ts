import { Server } from "./base/02-Server";
import Proxy from "./ProxyClass";

const server = new Server()
const proxyServer = new Proxy(server, 1)
proxyServer.operation()

const proxyServerWithoutPermission = new Proxy(server, 0)
proxyServerWithoutPermission.operation()


import { createProxyServer } from "./ProxyByAPI";
const proxyByAPIServerWithoutPermission = new Proxy(server, 0)
proxyByAPIServerWithoutPermission.operation()
import ClientInterface from "./Interface/ClientInterface";
import Server1 from "./Servers/Server1";
import Server2 from "./Servers/Server2";
import { Server1Adaptor, Server2Adaptor } from "./Adapter";

function runClient(target: ClientInterface, message: string): void {
    target.method({ arg: message });
}

const server1Adaptor = new Server1Adaptor(new Server1());
const server2Adaptor = new Server2Adaptor(new Server2());

runClient(server1Adaptor, "request from Client to Server1");
runClient(server2Adaptor, "request from Client to Server2");

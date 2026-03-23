import ClientInterface, { ClientInterfaceFuncProp } from "./Interface/ClientInterface";
import Server1 from "./Servers/Server1";
import Server2 from "./Servers/Server2";

export class Server1Adaptor implements ClientInterface {
    constructor(private readonly server1: Server1) { }

    public method(prop: ClientInterfaceFuncProp): void {
        this.server1.funcFromServer1(prop)
    }
}

export class Server2Adaptor implements ClientInterface {
    constructor(private readonly server2: Server2) { }

    public method(prop: ClientInterfaceFuncProp): void {
        this.server2.funcFromServer2(prop.arg);
    }
}
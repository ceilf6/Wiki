export interface ClientInterfaceFuncProp {
    arg: string
}

export default interface ClientInterface {
    method(prop: ClientInterfaceFuncProp): void
}
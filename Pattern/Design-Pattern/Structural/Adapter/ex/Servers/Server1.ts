interface funcFromServer1Prop {
    arg: string
}

export default class Server1 {
    public funcFromServer1(prop: funcFromServer1Prop): void {
        console.log(`funcFromServer1 => ${prop.arg}`)
    }
}
import Func from "./Func";
import { Decorator1 } from "./Decorator/Decorator1";
import { Decorator2 } from "./Decorator/Decorator2";

@Decorator1("Dec1")
@Decorator2("Dec2")
class ClientFunc extends Func {

}

const clientFunc = new ClientFunc()
clientFunc.func("clientFunc")
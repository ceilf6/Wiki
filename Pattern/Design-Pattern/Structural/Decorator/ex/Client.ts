import Func from "./Func";
import Decorator1 from "./Decorator/Decorator1";
import Decorator2 from "./Decorator/Decorator2";

const func = new Func()
func.func('func')
console.log('// ======')

const funcDec1 = new Decorator1(func, 'Dec1')
funcDec1.func('funcDec1')
console.log('// ======')

const funcDec2 = new Decorator2(func, 'Dec2')
funcDec2.func('funcDec2')
console.log('// ======')

/**
Func => funcDec1Dec2
ID:Dec1 Decorator1 => funcDec1Dec2
ID:Dec1 => Dec2 Decorator2 => funcDec1Dec2
 */
const funcDec1Dec2 = new Decorator2(funcDec1, 'Dec1 => Dec2')
funcDec1Dec2.func('funcDec1Dec2')
console.log('// ======')
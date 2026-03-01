const obj = {
    a: 1,
}

const desc = Object.getOwnPropertyDescriptor(obj, 'a');
console.log(desc);
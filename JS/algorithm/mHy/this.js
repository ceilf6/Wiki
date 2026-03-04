const obj = {
    name: 'obj',
    getName() {
        return this.name
    },
    getName2: () => {
        return this.name
    },
    getNameOutter() {
        const inner = () => {
            return this.name
        }
        return inner()
    }
}

console.log(obj.getName())
console.log(obj.getName2())
console.log(obj.getNameOutter())

const getName = obj.getName
console.log(getName())
import Template from "./01-Template";

export default class Programmer implements Template {
    private _name: string

    constructor(name: string) {
        this._name = `Programmer ${name}`
    }

    private _doing() {
        return this._name + ' is'
    }

    private _sleeping() {
        console.log(this._doing() + ' sleeping')
    }

    private _working() {
        console.log(this._doing() + ' working')
    }

    private _relaxing() {
        console.log(this._doing() + ' relaxing')
    }

    at8(): void {
        this._sleeping()
    }

    at10(): void {
        this._working()
    }

    at14(): void {
        this._working()
    }

    at20(): void {
        this._working()
    }

    at22(): void {
        const n = Math.floor(Math.random() * 10); // 0-9
        if (n >= 2)
            this._working()
        else
            this._relaxing()
    }

    at24(): void {
        this._sleeping()
    }
}
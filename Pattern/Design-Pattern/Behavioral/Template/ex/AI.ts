import Template from "./01-Template";

export default class AI implements Template {
    private _name: string

    constructor(name: string) {
        this._name = `AI ${name}`
    }

    private _doing() {
        return this._name + ' is'
    }

    private _working() {
        console.log(this._doing() + ' working')
    }

    at8(): void {
        this._working()
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
        this._working()
    }

    at24(): void {
        this._working()
    }
}
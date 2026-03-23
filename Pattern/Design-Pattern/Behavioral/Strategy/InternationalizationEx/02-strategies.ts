import type { I18nMessages, MessageKey, Params } from './01-types'

export interface I18nStrategy {
    t(key: MessageKey, params?: Params): string
}

export class DictionaryStrategy implements I18nStrategy {
    constructor(private readonly dict: I18nMessages) { }

    t(key: MessageKey, params: Params = {}): string {
        return interpolate(this.dict[key], params)
    }
}

function interpolate(template: string, params: Params): string {
    return template.replace(/\{(\w+)\}/g, (_, token: string) => {
        const value = params[token]
        return value === undefined ? `{${token}}` : String(value)
    })
}

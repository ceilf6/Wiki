import type { MessageKey, Params } from './01-types'
import type { I18nStrategy } from './02-strategies'

export default class I18nContext {
    constructor(private strategy: I18nStrategy) { }

    setStrategy(strategy: I18nStrategy): void {
        // 变更策略实现地区切换
        this.strategy = strategy
    }

    t(key: MessageKey, params?: Params): string {
        return this.strategy.t(key, params)
    }
}

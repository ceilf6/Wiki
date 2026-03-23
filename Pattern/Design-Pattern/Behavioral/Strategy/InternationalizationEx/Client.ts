import I18nContext from './03-I18nContext'
import { enUSMessages, zhCNMessages } from './04-locales'
import { DictionaryStrategy } from './02-strategies'

const i18n = new I18nContext(new DictionaryStrategy(zhCNMessages))

console.log('--- zh-CN ---')
console.log(i18n.t('welcome', { name: 'ceilf6' }))
console.log(i18n.t('loginSuccess'))
console.log(i18n.t('itemCount', { count: 3 }))

i18n.setStrategy(new DictionaryStrategy(enUSMessages))

console.log('--- en-US ---')
console.log(i18n.t('welcome', { name: 'ceilf6' }))
console.log(i18n.t('loginSuccess'))
console.log(i18n.t('itemCount', { count: 3 }))

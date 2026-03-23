import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { I18nMessages } from './01-types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function loadLocale(fileName: string): I18nMessages {
    const filePath = join(__dirname, 'locales', fileName)
    const content = readFileSync(filePath, 'utf-8')
    return JSON.parse(content) as I18nMessages
}

export const zhCNMessages = loadLocale('zh-CN.json')
export const enUSMessages = loadLocale('en-US.json')

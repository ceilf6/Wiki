import { locales } from '@my-monorepo/locales';

console.log('--- Web App Locale Demo ---');

// 模拟获取当前语言
const currentLang: 'zh-CN' | 'en-US' = 'zh-CN';

console.log(`Current Language: ${currentLang}`);
console.log(`Greeting: ${locales[currentLang].hello}`);
console.log(`Message: ${locales[currentLang].welcome}`);

console.log('\n--- Switch to English ---');
console.log(`Greeting: ${locales['en-US'].hello}`);

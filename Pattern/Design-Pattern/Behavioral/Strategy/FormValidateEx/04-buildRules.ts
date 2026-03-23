import FormValidator from './03-FormValidator'
import {
    EmailStrategy,
    MinLengthStrategy,
    NumberRangeStrategy,
    RequiredStrategy
} from './strategies/02-ValidateStrategies'

export default function buildValidatorRules(validator: FormValidator): void {
    validator.addRule('username', '用户名', new RequiredStrategy())
    validator.addRule('username', '用户名', new MinLengthStrategy(4))

    validator.addRule('password', '密码', new RequiredStrategy())
    validator.addRule('password', '密码', new MinLengthStrategy(8, '长度太短'))

    validator.addRule('email', '邮箱', new EmailStrategy())
    validator.addRule('age', '年龄', new NumberRangeStrategy(18, 60))
}

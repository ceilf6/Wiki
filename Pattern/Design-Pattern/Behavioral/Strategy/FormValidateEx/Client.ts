import FormValidator, { FormData } from './03-FormValidator'
import buildValidatorRules from './04-buildRules'

const validator = new FormValidator()
buildValidatorRules(validator)

const submitData: FormData = {
    username: 'ce',
    password: '12345',
    email: 'not-an-email',
    age: '12'
}

const errors = validator.validate(submitData)

if (errors.length > 0) {
    console.log('表单校验失败：')
    errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`)
    })
} else {
    console.log('表单校验通过，提交数据：', submitData)
}

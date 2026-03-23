import { ValidateStrategy } from './01-Interface'

export type FormData = Record<string, string>

type Rule = {
    field: string,
    fieldLabel: string,
    strategy: ValidateStrategy
}

export default class FormValidator {
    private rules: Rule[] = []

    addRule(field: string, fieldLabel: string, strategy: ValidateStrategy): void {
        this.rules.push({ field, fieldLabel, strategy })
    }

    validate(formData: FormData): string[] {
        const errors: string[] = []

        for (const rule of this.rules) {
            const value = formData[rule.field] ?? ''
            const error = rule.strategy.validate(value, rule.fieldLabel)
            if (error) {
                errors.push(error)
            }
        }

        return errors
    }
}

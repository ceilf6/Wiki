import { ValidateStrategy } from "../01-Interface"

export class RequiredStrategy implements ValidateStrategy {
    constructor(private readonly message: string = '不能为空') { }

    validate(value: string, field: string): string | null {
        if (value.trim().length === 0) {
            return `${field}${this.message}`
        }
        return null
    }
}

export class MinLengthStrategy implements ValidateStrategy {
    constructor(
        private readonly min: number,
        private readonly message: string = '长度不足'
    ) { }

    validate(value: string, field: string): string | null {
        if (value.length < this.min) {
            return `${field}${this.message}，至少 ${this.min} 位`
        }
        return null
    }
}

export class EmailStrategy implements ValidateStrategy {
    constructor(private readonly message: string = '邮箱格式不正确') { }

    validate(value: string, field: string): string | null {
        if (value.trim().length === 0) {
            return null
        }

        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!reg.test(value)) {
            return `${field}${this.message}`
        }
        return null
    }
}

export class NumberRangeStrategy implements ValidateStrategy {
    constructor(
        private readonly min: number,
        private readonly max: number,
        private readonly message: string = '超出范围'
    ) { }

    validate(value: string, field: string): string | null {
        if (value.trim().length === 0) {
            return null
        }

        const num = Number(value)
        if (Number.isNaN(num)) {
            return `${field}必须是数字`
        }

        if (num < this.min || num > this.max) {
            return `${field}${this.message}，范围 ${this.min}-${this.max}`
        }
        return null
    }
}

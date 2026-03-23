export interface ValidateStrategy {
    validate(value: string, field: string): string | null
}
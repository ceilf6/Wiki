import { Button, Input } from "./AbstractProduct"

// 具体产品
export class MaterialButton extends Button {
    click(): string {
        return 'Material Button\'s clicked'
    }
}
export class MaterialInput extends Input {
    text(): string {
        return 'I\'m the text in Material Input'
    }
}
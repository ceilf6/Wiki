import { Button, Input } from "./AbstractProduct";
import React from 'React'

export class AntDesignButton extends Button {
    click(): string {
        return 'AntDesign Button\'s clicked'
    }
    // React.ReactElement {
    //     return (
    //         <button>
    //         AntDesignButton
    //         </button>
    //     )
    // }
}
export class AntDesignInput extends Input {
    text(): string {
        return 'I\'m the text in AntDesign Input'
    }
}

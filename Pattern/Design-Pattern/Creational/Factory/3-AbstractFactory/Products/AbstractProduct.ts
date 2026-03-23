import React from 'React'

// 抽象产品
export abstract class Button {
    abstract click(): string; // React.ReactElement;
}
export abstract class Input {
    abstract text(): string; // React.ReactElement;
}

import React from 'react';
import Input from '../Input';

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        const legend = props.legend && props.legend.length ? props.legend : ['用户名'];

        this.state = {
            legend,
            values: legend.map(() => '')
        };
    }

    // Form 对在里面的所有的 Input 都传递了 handleChange
    // 当其中一个变化时，直接修改了 Form 的 state 
    // 那么整个 Form 、 Form 中所有的 Input 都会 re-render
    handleChange = (index, nextValue) => {
        this.setState((prevState) => {
            const values = [...prevState.values];
            values[index] = nextValue;

            return { values };
        });
    };

    handleClick = () => {
        // 提交整个表单
        console.log(`你要提交的内容为：${this.state.values}`);
    }

    render() {
        const { legend, values } = this.state;

        return (
            <form>
                {legend.map((item, index) => (
                    <Input
                        key={`${item}-${index}`}
                        legend={item}
                        value={values[index]}
                        transform={(nextValue) => this.handleChange(index, nextValue)}
                    />
                ))}
                <button onClick={this.handleClick}>submmit</button>
            </form>
        );
    }
}

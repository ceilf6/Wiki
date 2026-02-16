import React from 'react'
import ctx, { Provider, Consumer } from './formContext'
import FormInput from './FormInput'
import FormButton from './FormButton'
import PropTypes from 'prop-types'

export default class Form extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func // 使用者传入的提交函数
    }

    state = {
        formData: {}, // 表单数据对象
        // 下放权力，修改表单数据函数
        changeFormData: (name, val) => {
            this.setState({
                formData: {
                    ...this.state.formData, // 其他属性
                    [name]: val // 覆盖属性
                }
            })
        },
        submit: () => { // 下放给 FormButton 的提交函数
            this.props.onSubmit && this.props.onSubmit(this.state.formData)
        }
    }

    render() {
        return (
            <Provider value={this.state}>
                {this.props.children}
                {/* 使用者是直接在 Form 中间写的，直接通过 children 拿到 */}
            </Provider>
        )
    }
}

// Form.Input 本质就是通过JS添加静态属性
Form.Input = FormInput
Form.Button = FormButton
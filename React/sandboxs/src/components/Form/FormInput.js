import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ctx from './formContext'

export default class FormInput extends Component {
    static contextType = ctx

    static defaultProps = {
        type: 'text'
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }

    render() {
        return (
            <div>
                <input
                    type={this.props.type}
                    value={this.context.formData[this.props.name] || ''}
                    // 受控：数据来自上下文
                    // 注意 '' 兜底一下，否则一开始是 undefined 会报错从非受控到受控
                    onChange={e => this.context.changeFormData(this.props.name, e.target.value)}
                // 通过 change 事件影响数据
                />
            </div>
        )
    }
}

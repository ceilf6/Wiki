import React, { Component } from 'react'
import Form from './index'

export default class Test extends Component {
    render() {
        return (
            <div>
                <Form onSubmit={datas => {
                    console.log('=== submit', datas); //获取表单中的所有数据（对象）
                    /*
                        {
                            loginId:xxxx,
                            loginPwd:xxxx
                        }
                    */
                }}>
                    <div>
                        账号： <Form.Input name="loginId" />
                    </div>
                    <div>
                        密码： <Form.Input name="loginPwd" type="password" />
                    </div>
                    <div>
                        <Form.Button>提交</Form.Button>
                    </div>
                </Form>
            </div>
        )
    }
}

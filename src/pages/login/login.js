import React, {Component} from 'react'
import { Form, Input, Icon, Button,message } from 'antd'
import logo from './images/airlync.png'
import './login.less'
import memoryUtils from '../../utils/memoryUtils'
import {reqLogin} from "../../api/index";

const Item = Form.Item
/*登陆路由组件 */
class Login extends Component {

  handleSubmit=(event)=>{
        // 阻止事件的默认行为
        event.preventDefault()

        // 进行表单所有控件的校验
        this.props.form.validateFields(async (err, values) => {
            this.props.history.replace('/login')
            if (!err) {
                // 校验成功
                const {username, password} = values
                const result = await reqLogin(username, password)
                if (result.status === 0 && username=="admin" && password=="1234") {
                    message.success('登陆成功', 2)
                    // 保存用户登录信息
                    memoryUtils.user = result.data
                    // 跳转到主页面
                    this.props.history.replace('/login')

                } else {
                    // 登录失败, 提示错误
                    message.error(result.msg)
                }
            }else {
                    console.log('检验失败!')
                }


        });
    }

    /***
     * 自定义表单的校验规则*/
   validator = (rule, value, callback) => {
        console.log(rule, value)
        const length = value && value.length
        const pwdReg = /^[a-zA-Z0-9_]+$/
        if (!value) {
            // callback 如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
          callback('必须输入密码')
            } else if (length < 4) {
            callback('密码必须大于 4 位')
        } else if (length > 12) {
            callback('密码必须小于 12 位') }
            else if (!pwdReg.test(value))
            { callback('密码必须是英文、数组或下划线组成') }
            else {
            callback() // 必须调用 callback }
        }


    }

render() {
 const {getFieldDecorator} = this.props.form
    return (
    <div className='login'>
           <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React-Test-Happy</h1>
            </header>

        <section className='login-content'>
            <h3>用户登陆</h3>
           <Form onSubmit={this.handleSubmit}
                 className="login-form">
                 <Item>
                {
                  /*
                  getFieldDecorator 是一个高阶函数(返回值是一个函数)
                   getFieldDecorator(标识名称，配置对象)(组件标签) 返回新的标签 经过
                   getFieldDecorator 包装的表单控件会自动添加 value 和 onChange，
                    数据同步 将被 form 接管*/

                        getFieldDecorator('username',{
                             // 根据内置验证规则进行声明式验证
                                    rules: [
                                        {required: true, whitespace: true, message: '必须输入用户名'},
                                        {min: 4, message: '用户名必须大于 4 位'},
                                        {max: 12, message: '用户名必须小于 12 位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线 组成'}
                                        ]
                                    } )(
                           <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="用户名"/>
                                )
                        }

                        </Item>
                        <Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        // 自定义表单校验规则
                                        {validator: this.validator}
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password"
                                           placeholder="密码"/>
                                )

                            }

                       </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div> )
    }
}

/*
用户名/密码的的合法性要求
1). 必须输入
2). 必须大于 4 位
3). 必须小于 12 位
4). 必须是英文、数组或下划线组成*/

const WrapLogin = Form.create()(Login)
export default WrapLogin
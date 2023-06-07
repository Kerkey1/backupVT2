import React from "react";
import {observer} from "mobx-react";
import {Button, Form, Input} from "antd";
import connectStore from "../stores/ConnectStore";
import {useNavigate} from "react-router";
import {setSession} from "../utils";

const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

const formTailLayout = {
    labelCol: {
        span: 14,
    },
    wrapperCol: {
        span: 18,
        offset: 4,
    },
};

const LoginPage = observer(({}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const rules = [
        {
            required: true,
            message: 'Пожалуйста, заполните поле',
        }
    ]

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const logIn = () => {
        let data = form.getFieldsValue();
        connectStore.testConnection(data).then(res => {
            if (res === "Connect success") {
                setSession(data)
                sleep(1500).then(() => navigate('/'))
            }
        })
    }

    return <div className="login-page-wrapper">
        <div className="login-form">
            <div className="login-logo">
                BackupVT
            </div>
            <Form form={form} onFinish={logIn}>
                <Form.Item
                    {...formItemLayout}
                    name="host"
                    label="Хост"
                    rules={rules}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="login"
                    label="Логин"
                    rules={rules}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="password"
                    label="Пароль"
                    rules={rules}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item {...formTailLayout}>
                    <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                        Подключиться
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
});
export default LoginPage;
import React from "react";
import {Button, Form, Input} from "antd";
import fileStore from "../stores/FileStore";
import {observer} from "mobx-react";

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

const SettingsPage = observer(() => {
    const [form] = Form.useForm();
    const rules = [
        {
            required: true,
            message: 'Пожалуйста, заполните поле',
        }
    ]

    const onFinish = () => {
        const data = form.getFieldsValue();
        fileStore.updateMountPoint(data)
    }

    return <div className="simple-wrapper">
        <div className="flex flex-column" style={{padding: "10px"}}>
            <h2>Настройка точки монтирования</h2>
            <Form form={form} name="dynamic_rule" onFinish={onFinish}>
                <Form.Item
                    {...formItemLayout}
                    name="mountIp"
                    label="Маунт ip"
                    rules={rules}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="mountLogin"
                    label="Маунт логин"
                    rules={rules}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="mountPassword"
                    label="Маунт пароль"
                    rules={rules}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item  {...formTailLayout}>
                    <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>

});
export default SettingsPage;
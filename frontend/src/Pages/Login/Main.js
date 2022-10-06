import { Button, Form, Input } from 'antd';
import React from 'react';
import axios from 'axios';
import { apiUrl, handleError, notificationSuccessMessage } from '../../util/util';
import { useNavigate } from 'react-router-dom';

const LogIn = ({setUpdate}) => {
    const navigate = useNavigate();

    const logIn = async (credentials) =>{
        try{
        const response = await axios.post(`${apiUrl}/login`,credentials,{withCredentials:true})
        setUpdate(true);
        notificationSuccessMessage('Logged in successfully')
        navigate('/')
        }catch (e){
            handleError(e);
        }
    }

  const onFinish = (values) => {
    logIn(values)
  };

  return (
    <div className='center'>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
            type: 'email'
          },
        ]}
      >
        <Input  />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default LogIn;
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { apiUrl, handleError, notificationSuccess } from "../../util/util.js";
import "./UpdatePrerequisites.css"
import axios from "axios";


const UpdatePrerequisites = () => {

  const [form] = Form.useForm();
  const [formItems, setFormItems] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchPrerequisites = async () =>{
    try{
    const response = await axios.post(`${apiUrl}/getPrerequisites`,{}, { withCredentials: true });
    const data = response.data.response;
    const dataArray = data.map(value => value.prerequisite)
    setFormItems(dataArray)
    setFormValues(dataArray)
    }catch(e){
        handleError(e)
    }
    setLoading(false)
  }  

  const updatePrerequisites = async (prerequisites) =>{
    setLoading(true);
    try{
        const response = await axios.post(`${apiUrl}/createPrerequisites`,prerequisites,{ withCredentials: true });
        notificationSuccess(response);
    }catch(e){
        handleError(e)
    }
    setLoading(false);
  } 

  useEffect(() =>{
    fetchPrerequisites();
  }, [])

  const onFinish = (values) => {
    const valuesArray = Object.values(values)
    updatePrerequisites(valuesArray);
  };

  console.log('rendered')
  
  const setFormValues = (dataArray) =>{
    const initialValues = {};
    dataArray.forEach((value, index) => {
        initialValues[index] = value;
    });
    form.setFieldsValue(initialValues);
  }
  
  const add = () => {
    setFormItems([...formItems, ""])
  };

  const remove = () =>{
    setFormItems(formItems.slice(0,-1))
  }

  
  return (
    <>
    <h1 className="heading"> Update prerequisites</h1>
    <div className="center">
    <Spin spinning={loading}>
      <Form onFinish={onFinish} form={form} >
        {formItems.map((value, index) => {
          return (
            <Form.Item name={index} key={index}>
              <Input/>        
            </Form.Item>
          );
        })}

        <Form.Item>
          <Button
            type="dashed"
            onClick={add}
            style={{
              width: "60%",
            }}
            icon={<PlusOutlined />}
          >
            Add field
          </Button>
          <Button
          className="remove-field"
            type="dashed"
            onClick={remove}
            style={{
              width: "35%",
            }}
            icon={<MinusCircleOutlined />}
          >
            Remove field
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
      </Spin>
      
    </div>
    </>
  );
};

export default UpdatePrerequisites;

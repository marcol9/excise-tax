import React, { useEffect } from "react";
import { Table, List, Skeleton } from "antd";
import { useState } from "react";
import axios from "axios";
import './OldReports.css'

const apiUrl = process.env.REACT_APP_API_URL;


const OldReports = () =>  {

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  async function getReports(user_id){
    const response = await axios.post(`${apiUrl}/getReports/${user_id}`);
    const reports = response.data.response;
        setData(reports);
        setList(reports);
        setInitLoading(false)
  }

  useEffect(()=>{
    getReports(1);
  }, []);

    return (
      <div className="center">
      <List
      className="demo-loadmore-list"
      loading={initLoading}
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 5,
      }}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
        >
          <Skeleton  loading={item.loading} active>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.report_id}</a>}
            />
            <div>{item.report_date}</div>
          </Skeleton>
        </List.Item>
      )}
    />
    </div>
  
    );
}

export default OldReports;
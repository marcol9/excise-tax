import React, { useCallback } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import { Space, Table, Tag, Button } from 'antd';
import './Calculations.css'

const columns = [
    {
      title: <b>Beregning</b>,
      dataIndex: 'beregning',
      key: 'beregning',
    },
    {
      title: <b>Afgifter, DKK</b>,
      dataIndex: 'afgifter',
      key: 'agifter',
    }
    
    
  ];
  // data hardcoded for now, needs to be changed later (afgifter)
  const data = [
    {
      key: '1',
      beregning: <u>Elforbrug</u>,


    },
    
    {
      key: '2',
      beregning: 'Afgifter på elektricitet i alt',
      afgifter: 270 ,

    },
    
    {
      key: '3',
      beregning: '- Heraf ikke godtgørelsesberettiget minimumsafgift',
      afgifter: 1.2,

    },
    
    {
      key: '4',
      beregning: 'Moms',
      afgifter: 20,

    },
    
    {
      key: '5',
      beregning: <b>Elafgifter og moms</b>,
      afgifter: <b>290.9</b>,

    },
    
    {
      key: '5.5',

    },
    
    {
      key: '6',
      beregning: <u>Vandforbrug</u>,
    },
    
    {
      key: '7',
      beregning: 'Afgifter på vand i alt',
      afgifter: 1344,

    },
    
    {
      key: '8',
      beregning: 'Moms',
      afgifter: 500,

    },
    
    {
      key: '9',
      beregning: <b>Vandafgift og moms</b>,
      afgifter: <b>1844</b>,

    },
    
    {
      key: '9.5',

    },
    
    {
      key: '10',
      beregning: <b>Afgifter og moms i alt</b>,
      afgifter: <b>2134</b>,

    },
    
    {
      key: '11',
      beregning: 'Afgifter og moms i alt',
      afgifter: 67.43,

    },
    
    {
      key: '12',
      beregning: 'Godtgørelse af vandafgift',
      afgifter: 336.02,

    },
    
    {
      key: '13',
      beregning: 'Momsfradrag af elafgift',
      afgifter: 5,

    },
    
    {
      key: '14',
      beregning: 'Momsfradrag af vandafgift',
      afgifter: 125,

    },
    
    {
      key: '15',
      beregning: <b>Godtgjorte afgifter og moms i alt</b>,
      afgifter: <u><b>533.44</b></u>,

    },
    
    
    
  ];

const reportId = '1';

const Calculations = () =>  {
    const navigate = useNavigate()
    const goToAccountNoInput = reportId =>{
        navigate(`/AccountNoInput/${reportId}`);
    }

    const location = useLocation();
    const inputs = location.state;
    console.log(inputs)
    return (
        <div>
    <div>
    
        <Table className="calculations-table" pagination={false} columns={columns} dataSource={data} size="small"/>
    </div>
        <div className="submit-btn-div">
            <Button type="primary" className="next-step-btn" onClick={()=> goToAccountNoInput(reportId)}> Next step</Button>
        </div>
        </div>
    );
}

export default Calculations;
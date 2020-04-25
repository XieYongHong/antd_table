import React from 'react';
import Table from './table';
import { Input } from 'antd'

import './App.css';

const datasource = [
    {
      name: '测试1',
      age: 23,
      sex: '女',
      sex1: '男',
    },
    {
      name: '测试2',
      age: 22,
      sex: '女',
      sex1: '男',
    },
    {
      name: '测试3',
      age: 18,
      sex: '女',
      sex1: '男',
    },
    {
      name: '测试4',
      age: 33,
      sex: '男',
      sex1: '男',
    }
]

function App() {

  const columns = [
    {
      title:'姓名',
      dataIndex: 'name',
      filters: {
        key: 'name',
        mode: 'check',
        domData: [{value: 1, title: '测试'},{value: 2, title: '测试2'}]
      }
    },
    {
      title:'年龄',
      dataIndex: 'age',
      
      sorterKey: 'age',
      editable: true,
      editDom: <Input />
    },
    {
      title:'姓别',
      dataIndex: 'sex',
      filters: {
        key: 'sex',
        mode: 'radio',
        domData: [{value: 1, title: '测试'},{value: 2, title: '测试2'}]
      }
    },
    {
      title:'姓别1',
      dataIndex: 'sex1',
      filters: {
        key: 'sex1',
      }
    },
  ]

  return (
    <div className="App">
        <Table 
          columns={columns}
          dataSource={datasource}
        />
    </div>
  );
}

export default App;

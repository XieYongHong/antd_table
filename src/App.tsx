import React, { useRef, ReactElement } from 'react';
import Table from './table';
import { Input, Select } from 'antd'

import './App.css';
import Button from 'antd/es/button';

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
      editData: {
        dom: (setValues: Function): ReactElement => {
          return <Input onChange={(e) => {setValues(e.target.value)}} />
        }
      },
    },
    {
      title:'姓别',
      dataIndex: 'sex',
      editData: {
        key: 'sexx',
        dom: (setValues: Function): ReactElement => {
          return <Select onChange={(value) => {setValues(value)}} style={{width: 150}}> 
                    <Select.Option value={0}>男</Select.Option> 
                    <Select.Option value={1}>女</Select.Option> 
                </Select>
        }
      },
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
      },
      render: (value:any,record:any,fn:any) => {
        console.log(fn);
        return <Button onClick={() => {
          console.log(fn());
        }} size="small">确定</Button>
      }
    },
  ]

  const table:any = useRef()


  function getEditDatas() {
    console.log(table.current.getEditData);
  }

  return (
    <div className="App">
      <div>
        <Button onClick={getEditDatas}>GET</Button>
      </div>
        <Table 
          columns={columns}
          dataSource={datasource}
          ref={table}
        />
    </div>
  );
}

export default App;

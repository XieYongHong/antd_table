import React, { ReactElement } from 'react'
import { Input, InputNumber, Form } from 'antd';


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
}

function editTableCall(props:EditableCellProps): ReactElement{
    const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    } = props
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    
    return (
        <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
}

export default editTableCall

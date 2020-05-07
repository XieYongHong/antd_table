/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, forwardRef, useImperativeHandle, ReactElement } from 'react'
import Table, { TableProps, ColumnProps } from 'antd/es/table'
import { Radio, Button, Input, Checkbox } from 'antd'
import {FilterOutlined} from '@ant-design/icons'
import './index.modules.less'

interface MyTabelProps<T> extends TableProps<T> {
    dataSource?: any[],
    columns: MyColumns<T>[],
}

interface MyColumns<T> extends ColumnProps<T> {
    filters?: filtersProps | any,
    key?: any,
    sorterKey?: string
    editable?: boolean,
    editData?: {
        dom: (setValues:Function) => ReactElement,
        key?: string,
    },
    render?: (value: any, record: any, editData: any) => any
}

interface filtersProps {
    key: string,
    mode?: string,
    dom?: any[],
    pla?: string,
    domData?: FilterDomProps[]
}

interface FilterDomProps {
    title: string,
    value: any
}

function table<T>(props: MyTabelProps<T>, ref: any):ReactElement {

    const [columns, setColumns] = useState<MyColumns<any>[]>([]) // 表格列的配置描述

    const [defaultColums, setDefaultColums] = useState<MyColumns<any>[]>([]) // 默认表格列的配置描述

    const [filteredInfo, setFilteredInfo] = useState<any>(null) // 过滤参数对象
    const [sortedInfo, setSortedInfo] = useState<any>(null) // 排序参数对象

    const [queryFilterArgs, setQueryFilterArgs] = useState<any>(null) // 查询参数对象

    const [editDataList,setEditDataList] = useState<any[]>([]) //

    useEffect(() => {

    }, [])

    useEffect(() => {
        setDefaultColums(props.columns)
    }, [props.columns])

    useImperativeHandle(ref, () => ({
        getEditData: editDataList
    }))
    
    /**
    * 处理columns
    * @param data columns的数组
    */
    function handleColumns (data:Array<MyColumns<any>> = []): MyColumns<any>[] {
        return data.map( (item: MyColumns<any>) => {
            item.key = item.dataIndex
            const { filters, sorterKey, editData, render, ...extra} = item

//             item.render = (value,record) => {
//                 const key = record.key
//                 const obj = editDataList.find((a: any) => a.key === key)
//                 if(editData) {
//                     const name = editData.key || item.key
    
//                     const setValues = (value:any) => {
//                         if(obj) {
//                             obj[name] = value
//                             setEditDataList(editDataList)
//                         } else {
//                             setEditDataList([
//                                 ...editDataList,
//                                 {
//                                     key: key,
//                                     [name]: value
//                                 }
//                             ])
//                         }
    
//                         console.log(editDataList);
    
//                     }
    
//                     const dom = editData.dom ? editData.dom(setValues) : value
                    
//                     return dom
//                 }
//             }

            if(filters && JSON.stringify(filters) !== '{}') { // 自定义过滤
                return {
                    ...extra,
                    filterDropdown: (a: any) => handleFilter(a, filters, item.dataIndex), 
                    filteredValue: filteredInfo ? filteredInfo[item.dataIndex as string] : null, //控制过滤状态
                    filterIcon: filtered => {
                        return <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} /> 
                    }
                }
            }

            if(sorterKey) { // 排序
                return {
                    ...extra,
                    sortOrder: sortedInfo ? sortedInfo.columnKey === item.dataIndex && sortedInfo.order : false, // 控制排序状态
                    sorter: true
                }
            }
            
            return item
        })
    }

    /**
    * 处理过滤条件，添加Button
    * @param item 
    * @param filters 
    * @param dataIndex 
    */     
    function handleFilter(item: any, filters: filtersProps, dataIndex: any):ReactElement {
        const { setSelectedKeys, selectedKeys, confirm, clearFilters } = item
        
        return <div style={{padding:8}}>
                <div>
                    {
                        handleFilterDom(filters, setSelectedKeys, selectedKeys)
                    }
                </div>
                <Button 
                    type='link' 
                    size="small" 
                    style={{ width: 90, marginRight: 8 }}
                    onClick={() => {
                        clearFilters()
                    }}
                >
                    重置
                </Button>
                <Button 
                    type='primary' 
                    size="small" 
                    style={{ width: 90 }}
                    onClick={() => {
                        console.log(selectedKeys)
                        setFilteredInfo({
                            [dataIndex]: selectedKeys
                        })
                        confirm()
                    }}
                >
                    确认
                </Button>
            </div>
    }

    /**
    * 处理过滤dom
    * @param filters 外部传入filters对象
    * @param setSelectedKeys 设置值，必须为下标为0的数组即：setSelectedKeys([xxx])，才能触发Table组件的onChange事件
    * @param selectedKeys 数组
    */
    function handleFilterDom(filters: filtersProps, setSelectedKeys: any, selectedKeys: any):ReactElement {
        
        const { mode, pla, domData } = filters

        if(mode === 'radio') {
            return <Radio.Group
                    onChange={(e) => {setSelectedKeys([e.target.value])}}            
                    value={selectedKeys[0]}
                >
                {
                    domData && domData.length ?
                    domData.map((a:FilterDomProps) => <Radio key={a.value} value={a.value}>{a.title}</Radio>)
                    : null
                }
            </Radio.Group>
        }
        if(mode === 'check') {
            return <Checkbox.Group
                    onChange={(e) => {
                        setSelectedKeys([e])}
                    }            
                    value={selectedKeys[0] || []}
                >
                {
                    domData && domData.length ?
                    domData.map((a:FilterDomProps) => <Checkbox key={a.value} value={a.value}>{a.title}</Checkbox>)
                    : null
                }
            </Checkbox.Group>
        }
        return <Input
                placeholder={pla || '请输入...'}
                onChange={(e) => {setSelectedKeys([e.target.value])}}            
                value={selectedKeys[0]}
            />
    }

    function filterQuery(key:string, value: any):void {
        setQueryFilterArgs({
            [key]: value
        })
    }

    function cleanFilter():void { // 清除过滤筛选
        setFilteredInfo(null)
    }

    function cleanOrder():void { // 清除排序筛选
        setSortedInfo(null)
    }

    function cleanFilterAndOrder():void { // 清除排序 过滤筛选
        cleanFilter()
        cleanOrder()
    }

    return (
        <div className='concrete-table'>
            <Table 
                columns={handleColumns(defaultColums)}
                dataSource={props.dataSource?.map((item: any,index: number) => ({
                    key: item.id || index,
                    ...item,
                }))}
                onChange={(pagination, filters, sorter) => {
                    setEditDataList([])
                    setSortedInfo(sorter)
                }}
            />
        </div>
    )
}

export default forwardRef(table)

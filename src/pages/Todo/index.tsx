import React, {useEffect, useState} from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import {ProTable} from "@ant-design/pro-table";
import {Alert, Button, Checkbox, Form, FormInstance, Input, message, Modal} from "antd";
import {FileAddOutlined} from "@ant-design/icons/lib";
import {add, getTodoList, updatedata} from "@/services/todo";
import {connect} from "@@/plugin-dva/exports";
import {ProForm, ProFormText} from "@ant-design/pro-form";
//声明式组件和函数式组件，不太一样
const Todo = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal=()=>{
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log('页面的todo打印')
  console.log(props.todo)
  //别的组件加载的时候，这个todoList就有数据了
  const data=props.todo.todoList;

  //代办样式索引组
  const status = [
    <Alert message="代办" type="info" showIcon/>,
    <Alert message="已完成" type="success" showIcon/>,
    <Alert message="已取消" type="error" showIcon closable/>
  ]

  const updateStatus = async (data)=> {
    //调用service进行数据的更新
    const res = await updatedata(data);
    //之后还要调用dispatch，进行全局状态的改变。
    if(res.code ===0 ){
      let dispatch = props.dispatch;
      dispatch({
        type:'todo/getTodoList',
        payload:null
      })
      message.success(res.message)

    }else{
      message.error(res.message);
    }
    console.log('更新状态成功');

  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    }, {
      title: '标题',
      dataIndex: 'title'
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => {
        return status[record['status']];
      }
    }, {
      title: '修改状态',
      render: (_,record) =>{
       let array1 =[];
       if(record.status !== 0){
         array1.push(<a key={0} onClick={()=>{updateStatus({id:record.id,status:0})}}>待办 </a>);
       } if(record.status !== 1){
         array1.push(<a key={1} onClick={()=>{updateStatus({id:record.id,status:1})}}>完成 </a>,);
       } if(record.status !== 2){
         array1.push(<a key={2} onClick={()=>{updateStatus({id:record.id,status:2})}}>取消 </a>);
       }

        return array1;

      } ,
    },
  ]

  // const data =[
  //   {id:1,title:'TodoList列表',status:0},
  //   {id:2,title:'TodoList添加',status:1},
  //   {id:3,title:'TodoList编辑',status:2},
  //   {id:4,title:'TodoList添加',status:1},
  // ]

  //因为要修改他,所以我们不能用常量定义
  //let data=[];

  // let [data,setData] = useState([]);

  //函数式组件,状态的改变，要用useState

  // useEffect(async ()=>{
  //
  //  const resData = await getTodoList();
  //  setData(resData);
  //
  // },[]);
  const onFinish = async (values: any) => {
    let res = await add(values);
    if(res.code ===0 ){
      let dispatch = props.dispatch;
      dispatch({
        type:'todo/getTodoList',
        payload:null
      })
      message.success(res.message)
      console.log(res.status);
    }else{
      message.error(res.message);
    }
    console.log('Success:', values);
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };
  // const tailLayout = {
  //   wrapperCol: { offset: 8, span: 16 },
  // };



  return (
    <PageContainer>
      <ProTable
        // dataSource={tableListDataSource}
        dataSource={data}
        rowKey="id"
        // request={async () => {
        //   return {data: await getTodoList()}
        // }}
        pagination={{
          showQuickJumper: true,
        }}
        columns={columns}
        search={false}
        dateFormatter="string"
        headerTitle="待办事项"
        toolBarRender={() => [
          // <Button key="show">新建</Button>,
          // <Button key="out">
          //   导出数据
          //   <DownOutlined />
          // </Button>,
          <Button type="primary" key="primary" onClick={showModal}>
            <FileAddOutlined/> 新建
          </Button>,
        ]}
      />
      <Modal title="添加代办事项" open={isModalOpen}  onCancel={handleCancel} footer={null}>
        {/*<Form*/}
        {/*  name="basic"*/}
        {/*  labelCol={{ span: 8 }}*/}
        {/*  wrapperCol={{ span: 16 }}*/}
        {/*  initialValues={{ remember: true }}*/}
        {/*  onFinish={onFinish}*/}
        {/*  onFinishFailed={onFinishFailed}*/}
        {/*  autoComplete="off"*/}
        {/*>*/}
        {/*  <Form.Item*/}
        {/*    label="title"*/}
        {/*    name='待办事项'*/}
        {/*    rules={[{ required: true, message: '请输入待办事项' }]}*/}
        {/*  >*/}
        {/*    <Input />*/}
        {/*  </Form.Item>*/}
        {/*  <Form.Item {...tailLayout}>*/}
        {/*    <Button type="primary" htmlType="submit">*/}
        {/*      提交*/}
        {/*    </Button>*/}
        {/*    <Button htmlType="button" onClick={this.onReset}>*/}
        {/*      重置*/}
        {/*    </Button>*/}

        {/*  </Form.Item>*/}
        {/*</Form>*/}
        <ProForm onFinish={(value)=>{onFinish(value)}}>
          <ProFormText name="todo" label="待办事项" placeholder="请输入待办" rules={[{required:true}]} />
        </ProForm>


    </Modal>
    </PageContainer>
  );
};

export default  connect(({todo})=>({todo}))(Todo);

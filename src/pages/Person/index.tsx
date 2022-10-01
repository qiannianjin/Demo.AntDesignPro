import React, {useRef,useEffect} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {ProTable} from "@ant-design/pro-table";
import {Button, Dropdown, Menu} from "antd";
import {EllipsisOutlined, PlusOutlined} from "@ant-design/icons/lib";
import {getPerson} from "@/services/person";
import {connect} from 'umi';



//定义
const columns = [
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    hideInSearch: true
  }
];

// const data =[
// {id:1,name:'tom',age:18},
// {id:2,name:'bill',age:18}
// ]

const menu = (
  <Menu
    items={[
      {
        label: '1st item',
        key: '1',
      },
      {
        label: '2nd item',
        key: '1',
      },
      {
        label: '3rd item',
        key: '1',
      },
    ]}
  />
);

// const personList = async (props) => {
//
//    const data = await getPerson();
//     const {dispatch} = props;
//
//   console.log(data)
//   console.log(data)
//   //调用model，更新数据
//   dispatch({
//     type:'person/fetchPersons',
//     payload:null
//   });
//
//   return {data};
//
//
// }


const Person = (props) => {
  const actionRef = useRef();

  const {dispatch} = props;

  useEffect(()=>{
    console.log('调用前');
    console.log(props);

    dispatch({
      type:'person/fetchPersons',
      payload:null
    })
    console.log('调用后');
    console.log(props);
  });

  const personList =  async ()=>{
    const data = await props.person.persons;
    return {data};

  }

  return (
    <div>
      <PageContainer>
        <ProTable
          columns={columns}
          actionRef={actionRef}
          // request={()=>personList(props)}
          // request={async ()=> personList()}
          // request={async (params = {}, sort, filter) => { return data }}
          // request={async (params = {}, sort, filter) => {
          //   console.log(sort, filter);
          //   return request<{
          //     data: ;
          //   }>('https://proapi.azurewebsites.net/github/issues', {
          //     params,
          //   });
          // }}
          // request ={async (params?: {10,1},sort,filter) => ({data, pageSize: 10, current: 1, total:28, success: true,})}

          dataSource={props.person.persons}
          editable={{
            type: 'multiple',
          }}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          pagination={{
            pageSize: 5,
            onChange: (page) => console.log(page),
          }}
          dateFormatter="string"
          headerTitle="高级表格"
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined/>} type="primary">
              新建
            </Button>,
            <Dropdown key="menu" overlay={menu}>
              <Button>
                <EllipsisOutlined/>
              </Button>
            </Dropdown>,
          ]}
        />
      </PageContainer>
    </div>
  );
};

//看不懂这块的语法
export default connect(({person})=>({person}))(Person);
// export default Person

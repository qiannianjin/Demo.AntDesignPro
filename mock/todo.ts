import {json} from "express";

let todoList = [
  {id: 1, title: 'TodoList列表', status: 0},
  {id: 2, title: 'TodoList添加', status: 0},
  {id: 3, title: 'TodoList编辑', status: 2},
  {id: 4, title: 'TodoList添加', status: 1},
  {id: 5, title: 'TodoList总结', status: 0},
  {id: 6, title: 'TodoList新建', status: 1},
];

export default {
  'GET /api/todoList': todoList,
  'POST /api/todo': async (req, res) => {
    //添加todo
   const item = await {
      id: todoList.length + 1,
      title: req.body.todo,
      status: 0
    }
    todoList.unshift(item);
    console.log(req.body.todo)
    //添加返回结果
   const resp = {
      code: 0,
      message: '添加待办事项成功'
    }
   res.send(resp);
  },
  'POST /api/update': async (req, res) => {
    let data = await req.body;
    //遍历并更新状态
     todoList.map((item,index)=>{
      if(item.id === data.id){
        item.status=data.status;
      }
    })
    console.log(req.body);
    //添加返回结果
    const resp = {
      code: 0,
      message: '修改状态成功'
    }
    res.send(resp);
  }

}

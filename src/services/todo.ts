import request from "@/utils/request";

export const getTodoList = async ()=>{
  console.log('被调用了getTodoList')
  return await request('/api/todoList');
}
export const add = async (params)=>{
  console.log(params)
  return await request.post('/api/todo',{data:params})

}

export const updatedata = async (params)=>{
  return await request.post('/api/update',{data:params})

}

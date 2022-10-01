import {getTodoList} from "@/services/todo";

export default {
  namespace: 'todo',
  state: {todoList: []},
  effects: {
    //call可以获取数据
    //put可以将数据放进reducer里面
    // *getTodoList({payload, callback}, {call, put}) {
    * getTodoList(_, {call, put}) {
      //调用方法获取数据,注意，这个方法后面不要加括号getTodoList()
      const resData = yield call(getTodoList)
      //put是一个方法，接受一个参数，参数里面有两个对象
      //相当于redux里面的一个action，类型
      console.log(resData);
      yield put({
        type: 'setTodoList',
        payload: resData
      })


    }
  },
  reducers: {
    //这个put传的参数都被这个action接受，所以，action.payload 是数据
    setTodoList(state, action) {
      return {
        ...state,
        todoList: action.payload
      }

    }

  }
}

import {getPerson} from "@/services/person";

export  default{
  //命名空间被调用的，唯一性
  namespace:'person',

  //这个命名空间里面包含的数据
  state:{
    persons: []

  },

  effects: {
    //*加yield解决异步问题
    //这里面是定义方法的，默认传入call和put两个函数,方法名随便起
    *fetchPersons(_,{call, put}){
      //调用service层的请求函数
      const data = yield call(getPerson)
      //put这个函数是将数据传入下面的action这个参数里面
      yield put(
        {//这个type一定要set加上命名空间
          type: 'setPersons',
          payload: data
        }
      )

    }
  },

  reducers: {
    setPersons(state, action){
      return{
        ...state,
        persons: action.payload
      }

    }

  }


}

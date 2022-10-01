import {LogoutOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {Avatar, Badge, Menu, Spin} from 'antd';
import React from 'react';
import {history, ConnectProps, connect} from 'umi';
import {ConnectState} from '@/models/connect';
import {CurrentUser} from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import {UnorderedListOutlined} from "@ant-design/icons/lib";
import {getTodoList} from "@/services/todo";

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  currentUser?: CurrentUser;
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  state = {
    todoNum: 0
  }

  async componentDidMount():void {
    /*    //方法一，发送请求获取数据
        // 获取todoList数据
        const data = await getTodoList();
        // 筛选待完成的数据
        let todoNum = data.filter(item => item.status === 0).length;
        // 修改状态
        this.setState({todoNum})*/

    //方法二: 使用model获取数据
    console.log('方法二: 使用model获取数据')
    console.log(this.props)
    const dispatch= this.props.dispatch
    if (dispatch) {
      await dispatch(
        {
          type: 'todo/getTodoList',
          //这个payload是传进getTodoList这个方法的参数。
          // 如果传了payload,就会被getTodoList({payload,callback},(call,put))中的第一个参数payload所接受到
          payload: null

        }
      )
    }


  }

  // 点击事件
  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const {key} = event;

    if (key === 'todo') {
      history.push('todo');
      return;
    }


    if (key === 'logout') {
      const {dispatch} = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    history.push(`/account/${key}`);
  };

  render(): React.ReactNode {

    console.log('铉染')
    console.log(this.props.todo.todoList)
    // 筛选待完成的数据
    const todoNum = this.props.todo.todoList.filter(item => item.status == 0).length;
    // // 修改状态
    // this.setState({todoNum})

    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined/>
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined/>
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider/>}
        <Menu.Item key="todo">
          <UnorderedListOutlined/>
          待办事项
          <Badge count={todoNum} offset={[10, 0]}/>
        </Menu.Item>
        <Menu.Item key="logout">
          <LogoutOutlined/>
          退出登录
        </Menu.Item>

      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar"/>
          <span className={`${styles.name} anticon`}>
            {currentUser.name}
          </span>
          <Badge count={todoNum} offset={[10, 0]} dot={true}/>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({user, todo}) => ({
  currentUser: user.currentUser,
  todo: todo
}))(AvatarDropdown);

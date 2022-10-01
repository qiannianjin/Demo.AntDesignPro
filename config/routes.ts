export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/Person',
            name: 'person',
            icon: 'UserOutlined',
            component: './Person',
          }, {
            path: '/todo',
            name: 'todo',
            icon: 'UnorderedListOutlined',
            component: './Todo',
          },
          {
            path: '/new',
            name: 'new',
            icon: 'AreaChartOutlined',
            component: './New',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin'],
              },
            ],
          },
          {
            name: 'list.table-list',
            icon: 'table',
            path: '/list',
            component: './ListTableList',
          },
          {
            name: 'accountcenter',
            icon: 'smile',
            path: '/accountcenter',
            component: './AccountCenter',
          },
          {
            name: 'accountsettings',
            icon: 'smile',
            path: '/accountsettings',
            component: './AccountSettings',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];

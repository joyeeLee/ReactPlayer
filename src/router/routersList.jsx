import Home from '../pages/Home';
import Login from '../pages/Login';
import MusicPlayer from '../pages/MusicPlayer';

import NotFound from '../pages/NotFound.jsx';
import ImgsToIcons from '../pages/ImgsToIcons'
const otherRouter = [
  {
    path: '/404',
    title: '未找到页面',
    element: <NotFound />
  },
  {
    from: '*',
    to: '/404'
  }
];
const homeChildrensRouter=[
  {
    path: '/ImgsToIcons',
    title: 'ImgsToIcons',
    element: <ImgsToIcons />
  },
]

const pageRouter = [
  {
    path: '/',
    title: '首页',
    element: <Home />,
    children:homeChildrensRouter
  },
  {
    path: '/MusicPlayer',
    title: '音乐播放器',
    children:[],
    element: <MusicPlayer />
  },

  {
    path: '/login',
    title: '用户登陆',
    children:[],
    element: <Login />
  },
  [...otherRouter]
];
export { otherRouter, pageRouter };

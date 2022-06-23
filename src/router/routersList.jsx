import Home from '../pages/Home';
import Login from '../pages/Login';
import MusicPlayer from '../pages/MusicPlayer';

import NotFound from '../pages/NotFound.jsx';

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

const pageRouter = [
  {
    path: '/',
    title: '首页',
    element: <Home />
  },
  {
    path: '/MusicPlayer',
    title: '音乐播放器',
    element: <MusicPlayer />
  },

  {
    path: '/login',
    title: '用户登陆',
    element: <Login />
  },

];
export { otherRouter, pageRouter };

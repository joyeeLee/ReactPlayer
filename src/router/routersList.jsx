import Home from '../pages/Home';
import Login from '../pages/Login';
import MusicPlayer from '../pages/MusicPlayer';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
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
    redirect:true,
    element: <ImgsToIcons />
  },
]

const pageRouter = [
  {
    path: '/',
    title: '首页',
    icon:<ContentCut />,
    element: <Home />,
    children:homeChildrensRouter
  },
  {
    path: '/MusicPlayer',
    title: '音乐播放器',
    icon:<ContentCopy />,
    children:[],
    element: <MusicPlayer />
  },

  {
    path: '/login',
    title: '用户登陆',
    icon:null,
    children:[],
    element: <Login />
  },
  [...otherRouter]
];
export { otherRouter, pageRouter };

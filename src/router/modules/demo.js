const authRouter = [{
  path: '/login',
  name: 'Login',
  component: () => import('@/views/auth/login'),
  meta: {
    title: '登录'
  }
}, {
  path: '/register',
  name: 'Register',
  component: () => import('@/views/auth/register'),
  meta: {
    title: '注册'
  }
}, {
  path: '/set-psw',
  name: 'SetPsw',
  component: () => import('@/views/auth/setPsw'),
  meta: {
    title: '找回密码'
  }
}, {
  path: '/forget-psw',
  name: 'ForgetPsw',
  component: () => import('@/views/auth/forgetPsw'),
  meta: {
    title: '找回密码'
  }
}]

export default authRouter

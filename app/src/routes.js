export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView')
  },
  {
    path: '/add-server',
    name: 'add-server',
    component: require('components/AddServer')
  },
  {
    path: '/servers/:index',
    name: 'server-details',
    component: require('components/ServerDetails')
  },
  {
    path: '*',
    redirect: '/'
  }
]

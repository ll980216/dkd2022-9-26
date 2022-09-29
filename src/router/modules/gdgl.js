import Layout from '@/layout'
export default {
  path: '/gdgl',
  name: 'gdgl',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/gdgl/index.vue'),
      meta: {
        title: '工单管理',
        icon: 'tree-table'
      }
    }
  ]
}

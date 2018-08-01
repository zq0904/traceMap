const state = {
  // 权限表
  routes: {
    '010000': {
      path: '',
      name: '首页'
      // , components: {}
    },
    '020000': {
      path: 'air',
      name: '溯源地图'
    },
    '030000': {
      path: 'air/list',
      name: '数据排行'
    },
    '040000': {
      path: 'traceSource',
      name: '溯点地图'
    },
    '050000': {
      path: 'alarmRuleConfig',
      name: '报警规则配置'
    },
    '060000': {
      path: 'pollutionSource',
      name: '溯责地图'
    },
    '070000': {
      path: 'pollutionSource/list',
      name: '溯责报表'
    },
    '080000': {
      path: 'pollutionSource/crud',
      name: '溯责报表CRUD'
    },
    '990000': {
      path: 'error/test',
      name: '测试页面',
      components: {
        '990100': {
          name: '微站'
        },
        '990200': {
          name: '国控'
        },
        '990300': {
          name: '逻辑'
        },
        '990400': {
          name: '整体保存'
        },
        '990500': {
          name: 'AAA组件',
          btns: {
            '990501': { name: '添加修改 跳转路由' },
            '990502': { name: '详情' },
            '990503': { name: '多删除' }
          }
        },
        '990600': {
          name: 'BBB组件'
        }
      }
    }
  }
}

const mutations = {}
const actions = {}

export default {
  state,
  mutations,
  actions
}

<template>
  <div>
    <el-tree
      ref="tree"
      highlight-current
      show-checkbox
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
      :data="treeData"
      :props="defaultProps"></el-tree>
    <div class="buttons">
      <el-button @click="getAllChecked">通过 key 获取所有包括 半节点</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      treeData: [], // treen树
      defaultExpandedKeys: [], // 动态默认展开
      defaultProps: { // treen树 Props
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    ...mapGetters({
      regexp: 'getRegexp',
      permission: 'getPermission'
    })
  },
  created() {
    this.treeData = _.sortBy(this.routesTransitionTree(this.permission.routes), o => o.id)
    this.$nextTick(() => {
      this.setExpandedAndChecked(['030000', '990000', '990100', '990500', '990501'])
    })
  },
  methods: {
    // 递归 权限表 转化为 treeData格式数据
    routesTransitionTree(obj) { // obj权限表
      const children = []
      for (let key in obj) {
        const now = obj[key].components || obj[key].btns
        const o = now ? {
          'id': key,
          'label': obj[key].name,
          'children': this.routesTransitionTree(now)
        } : {
          'id': key,
          'label': obj[key].name
        }
        children.push(o)
      }
      return children
    },
    // 动态设置展开项和选中项
    setExpandedAndChecked(arr) { // arr = ['030000', '990000', '990100', '990500', '990501']
      let exclude = [] // 排除
      // 设置默认值
      for (let e of arr) {
        if (this.regexp.componentCode.test(e)) { // 组件级权限
          exclude.push(e.replace(/^(\d{2})\d{4}$/, '$10000'))
        } else if (this.regexp.btnsCode.test(e)) { // 按钮级权限
          exclude.push(e.replace(/^(\d{2})\d{4}$/, '$10000'))
          exclude.push(e.replace(/^(\d{4})\d{2}$/, '$100'))
        }
      }
      exclude = _.sortBy(_.uniq(exclude), o => o)
      const result = [] // 结果
      for (let e of arr) {
        if (exclude.indexOf(e) === -1) {
          result.push(e)
        }
      }
      this.defaultExpandedKeys = result // 动态设置展开项
      this.$refs.tree.setCheckedKeys(result) // 动态设置选中项
      // this.$refs.tree.setCheckedKeys([]) // 清空
    },
    // 获取所有选中和半半选中的checked
    getAllChecked() {
      const allChecked = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys())
      console.log(_.sortBy(allChecked, o => o))
    }
  }
}
</script>

<style lang="scss">

</style>

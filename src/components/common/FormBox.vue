<template>
  <transition name="FormBox">
    <div class="FormBox" v-if="show">
      <div class="FormBox-body">
        <div class="FormBox-body-title">报警规则</div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" :disabled="formType === 2">
          <el-form-item label="规则类型 :" prop="dwType">
            <el-select v-model="form.dwType" placeholder="请选择规则类型" :disabled="formType === 3">
              <el-option v-for="(e, i) in type" :key="i" :label="e" :value="Number(i)"></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="别名 :" prop="dwName">
                <el-input v-model="form.dwName" placeholder="请输入别名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="short">
              <el-form-item :label="form.dwType === 3 ? '断线时长 :' : '连续超标 :'" prop="isDwCount">
                <el-input v-model.number="form.isDwCount" :placeholder="form.dwType === 3 ? '输入断线时长' : '输入连续超标'"></el-input>
              </el-form-item>
              <span>{{form.dwType === 3 ? '小时' : '次数'}}</span>
            </el-col>
          </el-row>
          <el-row v-if="form.dwType !== 3">
            <el-col :span="12" class="short">
              <el-form-item label="对比粒度 :" prop="dwTime">
                <el-input v-model.number="form.dwTime" placeholder="输入对比粒度"></el-input>
              </el-form-item>
              <span>分钟</span>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数 :" prop="dwParam">
                <el-select v-model="form.dwParam" placeholder="请选择参数" :disabled="formType === 3">
                  <el-option v-for="(e, i) in param" :key="i" :label="e" :value="Number(i)"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="form.dwType === 1">
            <el-col :span="12">
              <el-form-item label="范围上限 :" prop="lowerLimit">
                <el-input v-model.number="form.lowerLimit" placeholder="请输入范围上限"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="范围下限 :" prop="upperLimit">
                <el-input v-model.number="form.upperLimit" placeholder="请输入范围下限"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="比对设备 :" prop="dwDeviceid" v-if="form.dwType === 1">
            <el-select v-model="form.dwDeviceid" placeholder="请选择比对设备">
              <el-option v-for="(e, i) in device" :key="i" :label="e.label" :value="e.value"></el-option>
            </el-select>
          </el-form-item>
          <el-row v-if="form.dwType !== 3">
            <el-col :span="12" class="short">
              <el-form-item label="警告门限 :" prop="absoluteLimit">
                <el-input v-model.number="form.absoluteLimit" placeholder="输入警告门限"></el-input>
              </el-form-item>
              <span style="font-size: 12px;padding-left: 2px;">{{units}}</span>
            </el-col>
          </el-row>
          <div class="FormBox-body-btnWrap">
            <SingleButton text="取消" :fixedSize="true" :active="true" @click="cancel"></SingleButton>
            <SingleButton text="保存" v-if="formType !== 2" :fixedSize="true" :active="true" @click="save"></SingleButton>
          </div>
        </el-form>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { nameUnit } from '../../lib/common'
import SingleButton from '../common/SingleButton'

export default {
  props: {
    type: { // 规则类型
      type: Object,
      default() {
        return {}
      }
    },
    param: { // 参数
      type: Object,
      default() {
        return {}
      }
    },
    device: { // 比对设备
      type: Array,
      default() {
        return []
      }
    },
    formType: { // 打开表单弹框的类型 1添加 2详情 3修改 判断禁用规则
      type: Number,
      default: 1
    },
    row: { // 当前表格行信息
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    SingleButton
  },
  data () {
    const scopeValidator = (rule, value, callback) => {
      return value >= 0 && value <= 9999 ? callback() : callback(new Error('数字范围在0-9999'))
    }
    return {
      show: false, // 整个表单的显示
      form: {
        dwId: '', // 序号
        dwType: 1, // 相对 1  绝对 2  断线 3
        dwName: '', // 别名
        dwParam: '', // 参数
        dwDeviceid: '', // 比对设备id
        dwTime: '', // 对比粒度
        isDwCount: '', // 连续超标 断线时长
        absoluteLimit: '', // 警告门限
        lowerLimit: '', // 范围下限
        upperLimit: '' // 范围上限
      },
      rules: { // 校验
        dwName: [
          { required: true, message: '请输入别名', trigger: ['change', 'blur'] },
          { max: 20, message: '长度不能超过20个字符', trigger: ['change', 'blur'] }
        ],
        dwParam: [
          { required: true, message: '请选择参数', trigger: 'change' }
        ],
        dwDeviceid: [
          { required: true, message: '请选择比对设备', trigger: 'change' }
        ],
        dwTime: [
          { required: true, message: '请输入对比粒度', trigger: ['change', 'blur'] },
          { type: 'number', message: '请输入数字类型', trigger: ['change', 'blur'] },
          { validator: scopeValidator, trigger: ['change', 'blur'] }
        ],
        isDwCount: [
          { required: true, message: '该值为必填项', trigger: ['change', 'blur'] },
          { type: 'number', message: '请输入数字类型', trigger: ['change', 'blur'] },
          { validator: scopeValidator, trigger: ['change', 'blur'] }
        ],
        absoluteLimit: [
          { required: true, message: '请输入告警门限', trigger: ['change', 'blur'] },
          { type: 'number', message: '请输入数字类型', trigger: ['change', 'blur'] },
          { validator: scopeValidator, trigger: ['change', 'blur'] }
        ],
        lowerLimit: [
          { required: true, message: '请输入范围下限', trigger: ['change', 'blur'] },
          { type: 'number', message: '请输入数字类型', trigger: ['change', 'blur'] },
          { validator: scopeValidator, trigger: ['change', 'blur'] }
        ],
        upperLimit: [
          { required: true, message: '请输入范围上限', trigger: ['change', 'blur'] },
          { type: 'number', message: '请输入数字类型', trigger: ['change', 'blur'] },
          { validator: scopeValidator, trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  watch: {
    // 深拷贝传递 必执行
    row(val) {
      // 2详情 3修改 使用row数据 1添加需重置
      this.form = val
    },
    // 表单内切换 dwType 重置表单
    'form.dwType': function(val) {
      this.resetFields(val)
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    }),
    // 单位转化
    units() {
      return nameUnit(this.param[this.form.dwParam] || '')
    }
  },
  methods: {
    // 取消
    cancel() {
      this.resetFields()
      this.show = false
    },
    // 保存
    async save() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        const {data} = await this.$fetch({
          url: this.api.alarmListCreate,
          data: { // 这里由于后台接收多余参数报错问题 只传递这些
            dwId: this.form.dwId, // 序号
            dwType: this.form.dwType, // 相对 1  绝对 2  断线 3
            dwName: this.form.dwName, // 别名
            dwParam: this.form.dwParam, // 参数
            dwDeviceid: this.form.dwDeviceid, // 比对设备id
            dwTime: this.form.dwTime, // 对比粒度
            isDwCount: this.form.isDwCount, // 连续超标 断线时长
            absoluteLimit: this.form.absoluteLimit, // 警告门限
            lowerLimit: this.form.lowerLimit, // 范围下限
            upperLimit: this.form.upperLimit // 范围上限
          }
        })
        if (data) {
          this.resetFields()
          this.show = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$emit('refresh')
        }
      })
    },
    // 重置表单
    resetFields(val = 1) { // 再次提示 重置必须有prop属性
      this.$refs.form.resetFields()
      this.form.dwType = val
    }
  }
}
</script>

<style lang="scss">
.FormBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, .3);
  &-body {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 506px;
    padding: 0 10px;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 5px;
    border-top: 4px solid #0087FF;
    background-color: #fff;
    &-title {
      position: relative;
      height: 36px;
      padding: 10px 0 10px 12px;
      font-size: 16px;
      color: #333;
      &::before {
        content: '';
        position: absolute;
        top: 10px;
        left: 0;
        height: 16px;
        border-left: 2px solid #0087FF;
      }
    }
    .el-form-item {
      margin-bottom: 20px;
      .el-form-item__label {
        width: 74px !important;
        padding-right: 2px;
        text-align: right;
        color: #999;
        &::before {
          content: none;
        }
      }
      .el-input input{
        width: 396px;
        height: 36px;
        line-height: 36px;
        color: #ccc;
      }
    }
    .el-col-12 {
      .el-form-item .el-input input {
        width: 153px;
      }
      &.short .el-form-item {
        float: left;
        input {
          width: 120px;
        }
      }
      span {
        float: left;
        padding-left: 5px;
        height: 40px;
        line-height: 40px;
        color: #999;
        font-size: 14px;
      }
    }
    &-btnWrap {
      padding: 10px 0 20px;
      text-align: center;
      .SingleButton:last-of-type {
        margin-left: 14px;
      }
    }
  }
}
// 进入过度
.FormBox-enter {
  opacity: 0;
}
.FormBox-enter-active {
  transition: .3s all linear;
}
</style>

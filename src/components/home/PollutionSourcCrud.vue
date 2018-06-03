<template>
  <div class="PollutionSourcCrud" v-loading="loading">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="custom-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/pollutionSource' }">污染源</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/pollutionSource/list' }">污染源报表</el-breadcrumb-item>
      <el-breadcrumb-item>污染源{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮 -->
    <div v-if="!disabled" class="compileBtn">
      <el-button type="primary" round size="small" @click="saveInfo">{{ title }}</el-button>
      <el-button round size="small" @click="resetForm">重置</el-button>
    </div>
    <!-- 表单 -->
    <el-form
      class="form-inline"
      size="small"
      :model="formData"
      :rules="rules"
      ref="ruleForm"
      :disabled="disabled">
      <el-row>
        <el-col :span="6">
          <el-form-item label="名称" prop="polluteName">
            <el-input v-model="formData.polluteName" placeholder="名称" required></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="经度" prop="baiduLongitude">
            <el-input v-model.number="formData.baiduLongitude" placeholder="经度"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="纬度" prop="baiduLatitude">
            <el-input v-model.number="formData.baiduLatitude" placeholder="纬度"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="污染源类型" prop="polluteTypeId">
            <el-select v-model="formData.polluteTypeId" placeholder="污染源类型">
              <el-option
                v-for="item in type" v-if="item.code !== ''" :key="item.code"
                :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="区域" prop="area">
            <el-input v-model="formData.area" placeholder="区域"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="formData.startTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择开始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="formData.endTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择结束时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="处理状态" prop="handlingStatusId">
            <el-select v-model="formData.handlingStatusId" placeholder="处理状态">
              <el-option
                v-for="item in status" v-if="item.code !== ''" :key="item.code"
                :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="责任人" prop="liablePerson">
            <el-input v-model="formData.liablePerson" placeholder="责任人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="责任主体" prop="liableSubject">
            <el-input v-model="formData.liableSubject" placeholder="责任主体"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系电话" prop="liablePhoneNumber">
            <el-input v-model="formData.liablePhoneNumber" placeholder="联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="其他信息" prop="msg">
            <el-input type="textarea" v-model="formData.msg" placeholder="其他信息"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="处理前图片">
            <el-upload
              v-if="!disabled"
              :class="beforeFileList.length < limit ? '' : 'hideAddBtn'"
              ref="beforeUpload"
              list-type="picture-card"
              :action="api.pollutionListImg"
              :auto-upload="false"
              :file-list="beforeFileList"
              :data="{flag: 'before', polluteId: formData.polluteId, unique: formData.unique}"
              :on-preview="handlePictureCardPreview"
              :on-change="handleBeforeChange"
              :on-remove="handleBeforeRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <img
              v-else
              class="echo-img"
              v-for="item in beforeImg" :key="item"
              :src="item"
              @click="preview = true; previewImageUrl = item">
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="处理后图片">
            <el-upload
              v-if="!disabled"
              :class="afterFileList.length < limit ? '' : 'hideAddBtn'"
              ref="afterUpload"
              list-type="picture-card"
              :action="api.pollutionListImg"
              :auto-upload="false"
              :file-list="afterFileList"
              :data="{flag: 'after', polluteId: formData.polluteId, unique: formData.unique}"
              :on-preview="handlePictureCardPreview"
              :on-change="handleAfterChange"
              :on-remove="handleAfterRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <img
              v-else
              class="echo-img"
              v-for="item in afterImg" :key="item"
              :src="item"
              @click="preview = true; previewImageUrl = item">
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 弹框 -->
    <ModalBox
      title="处理前图片"
      :width="450"
      :show="preview"
      @close="preview = false"
      :imgUrl="previewImageUrl"></ModalBox>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ModalBox from '../common/ModalBox'

export default {
  components: {
    ModalBox
  },
  data() {
    return {
      loading: false,
      title: '', // 面包屑title
      disabled: false, // 禁用表单
      status: [],
      type: [],
      formData: { // 表单数据信息
        polluteName: '',
        baiduLongitude: '',
        baiduLatitude: '',
        polluteTypeId: 1, // 新增 为'' 默认是不会选择的 修改给Number类型
        area: '', // 区域 !!!后台没有这个字段
        startTime: '',
        endTime: '',
        handlingStatusId: '', // 处理状态ID !!!后台没有这个字段
        liablePerson: '',
        liableSubject: '',
        liablePhoneNumber: '',
        msg: '',
        polluteId: '', // 污染源id
        unique: '' // 唯一时间戳标识 用于添加关联 上传图片 和 其余表单字段
      },
      // 上传的图片
      beforeFileList: [], // 处理前图片对象
      afterFileList: [], // 处理后图片对象
      // 回显的图片
      beforeImg: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2371707604,3818836805&fm=27&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=812586171,724963760&fm=27&gp=0.jpg'],
      afterImg: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2371707604,3818836805&fm=27&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=812586171,724963760&fm=27&gp=0.jpg'],
      limit: 2, // 允许上传的最大图片个数
      previewImageUrl: '', // 当前预览图片url
      preview: false, // 是否显示预览图
      rules: { // 校验规则
        polluteName: [ { required: true, message: '请输入名称', trigger: ['blur', 'change'] } ],
        baiduLongitude: [
          { required: true, message: '请输入经度', trigger: ['blur', 'change'] },
          { type: 'number', message: '经度必须为数字' }
        ],
        baiduLatitude: [
          { required: true, message: '请输入纬度', trigger: ['blur', 'change'] },
          { type: 'number', message: '纬度必须为数字' }
        ],
        polluteTypeId: [ { required: true, message: '请输入污染源类型', trigger: ['blur', 'change'] } ],
        area: [ { required: true, message: '请输入区域', trigger: ['blur', 'change'] } ],
        startTime: [ { required: true, message: '请输入开始时间', trigger: ['blur', 'change'] } ],
        endTime: [ { required: true, message: '请输入结束时间', trigger: ['blur', 'change'] } ],
        handlingStatusId: [ { required: true, message: '请输入处理状态', trigger: ['blur', 'change'] } ],
        liablePerson: [ { required: true, message: '请输入污染源类型', trigger: ['blur', 'change'] } ],
        liableSubject: [ { required: true, message: '请输入污染源类型', trigger: ['blur', 'change'] } ],
        liablePhoneNumber: [ { required: true, message: '请输入污染源类型', trigger: ['blur', 'change'] } ],
        msg: [ { required: true, message: '请输入污染源类型', trigger: ['blur', 'change'] } ]
      }
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    })
  },
  async created() {
    this.formData.unique = Date.now()
    await this.statusList()
    await this.typeList()
    this.judge()
  },
  methods: {
    // 判断业务流程
    async judge() {
      this.loading = true
      const { operation, id } = this.$route.query
      let s, r
      switch (operation) {
        case 'C': // 添加
          s = '添加'
          // 缺检验
          // 添加成功 提示用户 默认跳转list页
          break
        case 'R': // 查询
          s = '查询'
          this.disabled = true
          const {data} = await this.$fetch({ url: this.api.pollutionlistRetrieve, data: { polluteId: id } })
          console.log(data)
          r = data
          break
        case 'U': // 更新
          s = '更新'
          const {data: result} = await this.$fetch({ url: this.api.pollutionlistRetrieve, data: { polluteId: id } })
          console.log(result)
          r = result
          break
      }
      this.loading = false
      this.title = s
      // push表单
      // if (r) {
      //   this.formData
      // }
    },
    // 污染源状态列表
    async statusList() {
      const {data} = await this.$fetch({ url: this.api.pollutionState })
      // console.log(data)
      this.status = data.result.dict
    },
    // 污染源类型列表
    async typeList() {
      const {data} = await this.$fetch({ url: this.api.pollutionType })
      // console.log(data)
      this.type = data.result.list
    },
    // 查看预览图钩子
    handlePictureCardPreview(file) {
      console.log('查看预览图钩子')
      // console.log(file)
      this.previewImageUrl = file.url
      this.preview = true
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleBeforeChange(file, fileList) { this.beforeFileList = fileList },
    handleAfterChange(file, fileList) { this.afterFileList = fileList },
    // 删除图片钩子
    handleBeforeRemove(file, fileList) { this.beforeFileList = fileList },
    handleAfterRemove(file, fileList) { this.afterFileList = fileList },
    // 添加更新按钮
    saveInfo() {
      console.log(this.$refs)
      // 校验
      let verifyResult = false
      this.$refs.ruleForm.validate(valid => {
        verifyResult = valid
      })
      if (!verifyResult) return false // 校验不通过退出
      // 上传图片
      this.$refs.beforeUpload.submit()
      this.$refs.afterUpload.submit()
      // 上传其余表单信息
      this.$fetch({ url: this.api.pollutionlistCreate, data: this.formData })
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.$router.push('/pollutionSource/list')
    },
    // 重置按钮
    resetForm() {
      // 重置表单信息
      this.$refs.ruleForm.resetFields()
      // 重置上传图片
      this.beforeFileList = []
      this.afterFileList = []
    }
  }
}

</script>
<style lang="scss">
.form-inline {
  padding: 10px 10px 20px;
  .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
    float: left;
  }
  // label宽
  .el-form-item__label {
    width: 82px;
    // 去掉 必填自带的 *
    &::before {
      display: none;
    }
  }
  // 选框宽
  .el-input--small {
    width: 180px;
  }
  // textarea高 禁用拖拽拉伸
  .el-textarea__inner {
    height: 60px;
    resize: none;
  }
}
// 按钮
.compileBtn {
  position: absolute;
  top: 7px;
  right: 114px;
}
// 回显图片
.echo-img {
  width: 148px;
  height: 148px;
  margin-right: 10px;
  border-radius: 6px;
  border: 1px dashed #c0ccda;
  cursor: pointer;
  &:hover {
    border-color: #409EFF;
  }
}
// 对达到界限图片数量不显示 添加按钮
.hideAddBtn .el-upload {
  display: none;
}
</style>

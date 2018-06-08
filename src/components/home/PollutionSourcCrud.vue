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
      <el-button type="primary" round size="small" @click="saveInfo">保存</el-button>
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
            <el-select ref="polluteTypeId" v-model="formData.polluteTypeId" placeholder="污染源类型">
              <el-option
                v-for="item in type" v-if="item.code !== ''" :key="item.code"
                :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="区域" prop="areaCode">
            <el-input v-show="false" v-model="formData.areaCode" placeholder="区域"></el-input>
            <el-cascader
              placeholder="选择区域"
              filterable
              clearable
              change-on-select
              :show-all-levels="false"
              :options="areaDict"
              v-model="areaDictVal"
              :props="{label: 'text', value: 'code'}">
            </el-cascader>
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
          <el-form-item label="处理状态" prop="handlingStatus">
            <el-select v-model="formData.handlingStatus" placeholder="处理状态">
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
              accept="image/*"
              :class="beforeFileList.length < limit ? '' : 'hideAddBtn'"
              list-type="picture-card"
              :action="api.pollutionListUploadImg"
              :file-list="beforeFileList"
              :on-preview="handlePictureCardPreview"
              :before-remove="beforeRemove"
              :on-success="handleBeforeSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="处理后图片">
            <el-upload
              accept="image/*"
              :class="afterFileList.length < limit ? '' : 'hideAddBtn'"
              list-type="picture-card"
              :action="api.pollutionListUploadImg"
              :file-list="afterFileList"
              :on-preview="handlePictureCardPreview"
              :before-remove="beforeRemove"
              :on-success="handleAfterSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 弹框 -->
    <ModalBox
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
      areaDict: [], // 三级联动字典
      areaDictVal: [], // 三级联动字典 选值
      status: [],
      type: [],
      formData: { // 表单数据信息
        polluteName: '',
        baiduLongitude: '',
        baiduLatitude: '',
        polluteTypeId: '', // 新增 为'' 默认是不会选择的 修改给Number类型
        areaCode: '', // 区域码
        startTime: '',
        endTime: '',
        handlingStatus: '', // 处理状态ID
        liablePerson: '',
        liableSubject: '',
        liablePhoneNumber: '',
        msg: '',
        polluteId: '', // 污染源id
        beforeDisposePhotoUrl: '', // 关联处理前图片
        afterDisposePhotoUrl: ''
      },
      // 回显的图片
      beforeFileList: [], // 处理前图片对象
      afterFileList: [], // 处理后图片对象
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
        polluteTypeId: [ { required: true, message: '请选择污染源类型', trigger: ['blur', 'change'] } ],
        areaCode: [ { required: true, message: '请选择区域', trigger: ['blur', 'change'] } ],
        startTime: [ { required: true, message: '请选择开始时间', trigger: ['blur', 'change'] } ],
        endTime: [ { required: true, message: '请选择结束时间', trigger: ['blur', 'change'] } ],
        handlingStatus: [ { required: true, message: '请选择处理状态', trigger: ['blur', 'change'] } ],
        liablePerson: [ { required: true, message: '请输入责任人', trigger: ['blur', 'change'] } ],
        liableSubject: [ { required: true, message: '请输入责任主体', trigger: ['blur', 'change'] } ],
        liablePhoneNumber: [ { required: true, message: '请输入联系电话', trigger: ['blur', 'change'] } ],
        msg: [ { required: true, message: '请输入其他信息', trigger: ['blur', 'change'] } ]
      }
    }
  },
  watch: {
    // 监听 三级联动字典 选值 获取对应code
    areaDictVal(val) {
      // console.log(val)
      let s = ''
      switch (val.length) {
        case 0:
          break
        case 1:
          s += val[val.length - 1] + '000000'
          break
        case 2:
          s += val[val.length - 1] + '000'
          break
        case 3:
          s += val[val.length - 1]
          break
      }
      this.formData.areaCode = s
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    })
  },
  async created() {
    await this.linkage3()
    await this.statusList()
    await this.typeList()
    await this.judge()
  },
  methods: {
    // 判断业务流程
    async judge() {
      this.loading = true
      const { operation, id } = this.$route.query
      let s, r // 文本 结果对象
      switch (operation) {
        case 'C': // 添加
          s = '添加'
          // 缺检验
          // 添加成功 提示用户 默认跳转list页
          break
        case 'R': // 查询
          s = '详情'
          this.disabled = true
          const {data} = await this.$fetch({ url: this.api.pollutionlistRetrieve, data: { polluteId: id } })
          // console.log(data)
          r = data.result.info
          break
        case 'U': // 更新
          s = '更新'
          const {data: result} = await this.$fetch({ url: this.api.pollutionlistRetrieve, data: { polluteId: id } })
          // console.log(result)
          r = result.result.info
          break
      }
      this.loading = false
      this.title = s

      // 查询 更新 push表单 回显处理
      if (r) {
        // 区域 回显
        const arr = r.areaCode.match(/(\d{6})(\d{3})(\d{3})/)
        this.areaDictVal.splice(0, 1, arr[1])
        if (arr[2] !== '000') { this.areaDictVal.splice(1, 1, arr[1] + arr[2]) }
        if (arr[3] !== '000') { this.areaDictVal.splice(2, 1, arr[1] + arr[2] + arr[3]) }
        // console.log(this.areaDictVal)
        this.formData = {
          polluteName: r.polluteName,
          baiduLongitude: r.baiduLongitude,
          baiduLatitude: r.baiduLatitude,
          polluteTypeId: r.polluteTypeId,
          areaCode: r.areaCode, // 区域
          startTime: r.startTime,
          endTime: r.endTime,
          handlingStatus: r.handlingStatus,
          liablePerson: r.liablePerson,
          liableSubject: r.liableSubject,
          liablePhoneNumber: r.liablePhoneNumber,
          msg: r.msg,
          polluteId: r.polluteId, // 污染源id
          beforeDisposePhotoUrl: r.beforeDisposePhotoUrl, // 关联处理前图片
          afterDisposePhotoUrl: r.afterDisposePhotoUrl
        }
        // 回显图片
        r.beforePhotoList.forEach(e => {
          this.beforeFileList.push({url: e.saveName})
        })
        r.afterPhotoList.forEach(e => {
          this.afterFileList.push({url: e.saveName})
        })
        // 个别需要等到dom渲染在做一次检验
        this.$nextTick(() => {
          this.$refs.ruleForm.validate(valid => {})
        })
      }
    },
    // 三级联动字典
    async linkage3() {
      const {data} = await this.$fetch({ url: this.api.pollutionThreeLinkage, data: {type: 0} })
      // console.log(data)
      this.areaDict = data.result.areaDict
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
      // console.log(file)
      this.previewImageUrl = file.url
      this.preview = true
    },
    // 删除图片前钩子 此时的fileList还是没有变更的
    beforeRemove(file, fileList) {
      this.$confirm('您确定要删除图片吗？', '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确定
        this.beforeFileList.forEach((e, i) => {
          if (file.uid === e.uid) {
            // 获取 fromDate 关联字段 对应的数组
            const arr = this.formData.beforeDisposePhotoUrl.split(',')
            const delArr = arr.splice(i, 1) // 影响圆数组
            this.$fetch({
              url: this.api.pollutionListDelImg,
              data: {
                attachId: delArr[0],
                polluteId: this.formData.polluteId,
                flag: 'before'
              }
            }).then(data => {
              // 删除成功
              this.beforeFileList.splice(i, 1) // 清除视图
              this.formData.beforeDisposePhotoUrl = arr.join(',') // 清空fromDate关联字段
            })
          }
        })
        this.afterFileList.forEach((e, i) => {
          if (file.uid === e.uid) {
            // 获取 fromDate 关联字段 对应的数组
            const arr = this.formData.afterDisposePhotoUrl.split(',')
            const delArr = arr.splice(i, 1) // 影响圆数组
            this.$fetch({
              url: this.api.pollutionListDelImg,
              data: {
                attachId: delArr[0],
                polluteId: this.formData.polluteId,
                flag: 'after'
              }
            }).then(data => {
              // 删除成功
              this.afterFileList.splice(i, 1) // 清除视图
              this.formData.afterDisposePhotoUrl = arr.join(',') // 清空fromDate关联字段
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      return false
    },
    // 上传成功
    handleBeforeSuccess(res, file, fileList) {
      // 添加预览图
      this.beforeFileList = fileList
      // 关联formData 第一次添加 转字符添加 剩下的以逗号分割
      this.formData.beforeDisposePhotoUrl = this.formData.beforeDisposePhotoUrl === '' ? '' + res.result.fileList[0].id : this.formData.beforeDisposePhotoUrl + ',' + res.result.fileList[0].id
    },
    handleAfterSuccess(res, file, fileList) {
      this.afterFileList = fileList
      this.formData.afterDisposePhotoUrl = this.formData.afterDisposePhotoUrl === '' ? '' + res.result.fileList[0].id : this.formData.afterDisposePhotoUrl + ',' + res.result.fileList[0].id
    },
    // 保存按钮
    saveInfo() {
      // console.log(this.$refs)
      // 校验
      let verifyResult = false
      this.$refs.ruleForm.validate(valid => {
        verifyResult = valid
      })
      if (!verifyResult) return false // 校验不通过退出
      // 上传表单信息
      this.$fetch({ url: this.api.pollutionlistCreate, data: this.formData })
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      this.$router.push('/pollutionSource/list')
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
  // 图片tip 按 delete 键可删除 位置调整
  .el-upload-list__item .el-icon-close-tip {
    right: 20px;
  }
}
// 3级联动padding-right
.el-cascader-menu__item {
  padding-right: 30px;
}
// 按钮
.compileBtn {
  position: absolute;
  top: 7px;
  right: 114px;
}
// 对达到界限图片数量不显示 添加按钮
.hideAddBtn .el-upload {
  display: none;
}
</style>

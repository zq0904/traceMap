<template>
  <!-- bootstrap模态框 -->
  <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <div v-show="show" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel"
      @click.self="show = false">
      <div class="modal-dialog" role="document" :style="'width: ' + width + 'px'">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
              @click.stop="show = false"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="gridSystemModalLabel">{{ title }}</h4>
          </div>
          <div class="modal-body">
            <img v-if="imgUrl" width="100%" :src="imgUrl">
          </div>
          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: { // 标题
      type: String,
      default: ''
    },
    width: { // 模态框宽度
      deflate: 600
    },
    imgUrl: { // 图片url
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="scss">
.modal { display: block; }
.fade { opacity: 1; }
.modal.fade .modal-dialog {
  top: 50%;
  left: 50%;
  margin: 0;
  transform: translate3d(-50%, -50%, 0);
}
</style>

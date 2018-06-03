<template>
  <!-- bootstrap模态框 -->
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel"
    :class="show ? 'showModal' : 'hideModal'"
    @click.self="$emit('close')">
    <div class="modal-dialog" role="document">
      <div class="modal-content" :style="'width: ' + width + 'px'">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"
            @click="$emit('close')"><span aria-hidden="true">&times;</span></button>
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
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      deflate: 600
    },
    show: {
      type: Boolean,
      deflate: false
    },
    imgUrl: {
      type: String
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.modal.fade .modal-dialog {
  top: 160px;
}
.hideModal {
  display: none;
}
.showModal {
  display: block;
  background-color: rgba(0, 0, 0, .5);
  animation: showModal 0.3s linear forwards;
}
@keyframes showModal{
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

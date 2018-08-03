<template lang="pug">
  modal-dialog.cropper-dialog-modal(
    :show.sync='show'
    :width="'826px'"
    :height="'auto'"
    @close="cancel"
  )
    .cropper-dialog
      h2.title 图片裁剪
      .cut-option
        .tip 请选尺寸比例
        
        input.radio(type="radio" :value="169" v-model="cutRatio")
        .label 16:9
        input.radio(type="radio" :value="2351" v-model="cutRatio")
        .label 2.35:1
        input.radio(type="radio" :value="11" v-model="cutRatio")
        .label 1:1
        input.radio(type="radio" :value="0" v-model="cutRatio")
        .label 自由尺寸
  
      .content.clearfix
        .origin
          img(
            :src="inputImageData" @load="imageLoad" ref="sourceImage"
          )
        .target
          .target-wrapper
            .cropper-image-preview
          p {{`图片尺寸：${imageWidth}px * ${imageHeight}px`}}
          .panel
            el-button(
              size="small" round @click="cancel"
            ) 取消
            el-button(
              type='primary' size="small" round @click="crop"
            ) 确认

</template>

<script>
import Cropper from "./cropperjs/cropper.esm.js";
import "./cropperjs/cropper.css";
import ModalDialog from '../ModalDialog'

export default {
  name: "ImageCropper",
  components: {
    ModalDialog
  },
  props: {
    inputImageData: {
      type: String,
      default: ""
    },
    cropperImageData: {
      type: String,
      default: ""
    }
  },
  data() {
    let me = this;
    return {
      options: {
        aspectRatio: NaN,
        viewMode: 1,
        preview: '.cropper-image-preview',
        center: false,
        guides: false,
        minCropBoxWidth: 100,
        minCropBoxHeight: 100,
        autoCropArea: 1,
        crop(e) {
          const data = e.detail;
          me.imageWidth = Math.round(data.width);
          me.imageHeight = Math.round(data.height);
        }
      },
      cropper: null,
      cutRatio: 0,
      imageWidth: 0,
      imageHeight: 0,
    };
  },
  computed: {
    show: {
      get() {
        return this.inputImageData != "" ? true : false;
      }
    }
  },
  methods: {
    cancel() {
      this.$emit("update:inputImageData", "");
    },
    crop() {
      if (!this.cropper) {
        return;
      }
      let cropData = this.cropper.getCroppedCanvas({
        maxWidth: 4096,
        maxHeight: 4096
      }).toDataURL("image/jpeg");
      this.$emit("update:cropperImageData", cropData);
    },
    imageLoad(e) {
      let node = e.target;
      this.cropper = new Cropper(node, this.options);
    }
  },
  watch: {
    cutRatio (curVal, oldVal) {
      let ratio = 16/9;
      if (curVal == 169) {
        ratio = 16/9
      } else if (curVal == 2351) {
        ratio = 2.35/1
      } else if (curVal == 11) {
        ratio = 1
      } else {
        ratio = NaN
      }
      this.options.aspectRatio = ratio;
      this.cropper.destroy();      
      this.cropper = new Cropper(this.$refs.sourceImage, this.options)

    }
  }
};
</script>

<style lang="scss" scoped>
$image-size: 350px;

input[type="radio"] {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}


.el-button--small {
  padding: 8px 22px;
  font-size: 14px;
}

.cropper-dialog {
  padding: 20px 65px 45px 45px;
  user-select: none;

  .title {
    margin: 0 auto 27px;
    line-height: 1;
    font-size: 20px;
    font-weight: 500;
    color: #656286;
  }

  .cut-option {
    height: 20px;
    line-height: 20px;
    margin: 20px 0;
    .tip {
      display: inline-block;
      margin-right: 30px;
    }
    .radio {
      display: inline-block;
      margin-right: 10px;
    }
    .label {
      display: inline-block;
      margin-right: 30px;
    }
  }


  .content {
    .origin {
      float: left;
      width: 414px;
      height: 230px;
      background-color: #ffffff;
    }

    .target {
      float: right;
      width: 238px;

      .target-wrapper {
        margin-bottom: 10px;
        width: 238px;
        height: 132px;
        .cropper-image-preview {
          width: 100%;
          height: 132px;
          background-color: #f7f7f7;
          text-align: center;
          overflow: hidden;
          
        }
      }

      p {
        margin-bottom: 10px;
        line-height: 20px;
        font-size: 16px;
        color: #97969a;
      }

      .panel {
        margin-top: 52px;
        text-align: right;
      }
    }
  }
}
</style>

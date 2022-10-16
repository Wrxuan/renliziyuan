<template>
  <div>
    <el-upload
      v-loading="loading"
      class="uploadImg"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="onHttpRequest"
      :before-upload="beforeUpload"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="previewDialog"
      width="20%"
    >
      <img style="width:100%" :src="previewImgUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDGOs8C2d3GH4dy61ylLjxzfBVfeZGjyWr',
  SecretKey: 'Om6HG6pqfYIuKYZMupaAZljSyGMH0by7'
})
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      fileList: [
      ],
      previewDialog: false,
      previewImgUrl: '',
      loading: false
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({
        name: 'default', url: this.defaultUrl
      })
    }
  },
  created() {

  },
  methods: {
    onPreview(file) {
      console.log(file)
      this.previewDialog = true
      this.previewImgUrl = file.url
    },
    onRemove(file, fileList) {
      this.fileList = fileList
      console.log('点击删除')
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onHttpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'hz-33-1314348525', /* 填写自己的bucket，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) return this.$message.error('上传图片失败')
        this.loading = false
        this.$emit('on-success', {
          imgUrl: 'https://' + data.Location
        })
      })
    },
    beforeUpload(file) {
    // 要开始做文件上传的检查了
    // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 1 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    }
  }

}

</script>

<style lang="scss">
.uploadImg{
    width: 148px;
    height: 148px;
    overflow: hidden;
}
</style>

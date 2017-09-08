<template>
  <div>
    <div v-if="imageAvailable">
      <img v-bind:src="path" />
    </div>
    <div v-else >
      <el-card v-loading="true">
      </el-card>
    </div>
  </div>
</template>

<script>
import Axio from '@/common/utils/ServerUtils'
import ServerConfig from '@/common/utils/ServerConfig'
export default {
  name: 'picture_view',
  props: {
    id: { type: Number, required: true }
  },
  computed: {
    imageAvailable() {
      return this.path !== null
    }
  },
  mounted() {
    this.onLoad(this.id)
  },
  watch: {
    id: function (val, oldVal) {
      console.log(`PictureView: new val = ${val}`)
      this.onLoad(val)
    }
  },
  methods: {
    onLoad (val) {
      let self = this
      Axio.get(`api/v1/pictures/guwenyuan/${val}`)
      .then(function (response) {
        if (response.status === 200) {
          self.path = ServerConfig.serverUrl() + '/' + response.data
        }
      })
      .catch(function (err) {
        console.log(`error: cannot load id ${val}, error = ${err.toString()}`)
      })
    }
  },
  data() {
    return {
      path: null
    }
  },
}
</script>

<style>
</style>

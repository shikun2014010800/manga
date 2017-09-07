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
export default {
  name: 'picture_view',
  props: {
    id: { type: String, required: true }
  },
  computed: {
    imageAvailable() {
      return this.path !== null
    }
  },
  mounted() {
    let self = this
    Axio.get(`pictures/guwenyuan/${self.id}`)
    .then(function (response) {
      if (response.status === 200) {
        self.path = response.data
      }
    })
    .catch(function (err) {
      console.log(`error: cannot load id ${id}, error = ${err.toString()}`)
    })
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

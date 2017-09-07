<template>
  <div class="takegari">
    {{ text }}
  </div>
</template>
<script>
import Taketori from '@/common/utils/taketori.js'
export default {
  props: {
    id: { type: String, required: true }
  },
  mounted() {
    let self = this
    Axios.get(`texts/guwenyuan/${self.id}`)
    .then(function (result) {
      self.text = result
    })
    .catch(function (error) {
      console.log(`error: TranslationView = ${error.toString()}`)
    })
  },
  data() {
    return {
      text: ''
    }
  }
}
</script>
<style>
  @import '@/common/utils/taketori.css'
</style>

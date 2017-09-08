<template>
  <div class="fs">
    {{ text }}
  </div>
</template>
<script>

import Axio from '@/common/utils/ServerUtils'
export default {
  props: {
    id: { type: Number, required: true }
  },
  mounted() {
    this.onLoad(this.id)
  },
  watch: {
    id: function (val, oldVal) {
      console.log(`TranslationView: val = ${val}`)
      this.onLoad(val)
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onLoad (val) {
      let self = this
      Axio.get(`api/v1/texts/guwenyuan/${val}`)
      .then(function (result) {
        self.text = result.data
      })
      .catch(function (error) {
        console.log(`error: TranslationView = ${error.toString()}`)
      })
    }
  }
}
</script>
<style>
.fs {
    writing-mode:tb-rl; /*基本上就是这句的化腐朽为神奇了*/
    letter-spacing: 2px;
    float:right;
    margin:auto;
    margin-top: 100px;
    margin-right: 100px;
    font-size:120%;
}
</style>

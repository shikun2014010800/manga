<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
          <template v-for="page in 9">
            <el-menu-item v-bind:index="`'${page}'`" :key="page">第 {{page}} 页</el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="10">
        <PictureView :id="page" />
      </el-col>
      <el-col :span="10">
        <TranslationView :id="page" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PictureView from '@/components/PictureView'
import TranslationView from '@/components/TranslationView'
export default {
  name: 'manga_view',
  components: {
    PictureView,
    TranslationView
  },
  data() {
    return {
      page: 1
    }
  },
  methods: {
    handleSelect(index) {
      const indexWithoutQuote = index.replace('\'', '')
      console.log('handle index' + indexWithoutQuote)
      this.page = parseInt(indexWithoutQuote)
      console.log(`this.page = ${this.page}`)
    }
  }
}
</script>

<style>

</style>

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
        <PictureView v-bind:id="page" />
      </el-col>
      <el-col :span="10">
        <TranslationView v-bind:id="page" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PictureView from '@/cmoponents/PictureView'
import TranslationView from '@/components/TranslationView'
export default {
  name: 'manga_view',
  props: {
    mangaId: { type: String, required: true}
  },
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
      this.page = index
    }
  }
}
</script>

<style>

</style>

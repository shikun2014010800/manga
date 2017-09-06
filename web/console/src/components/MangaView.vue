<template>
  <div>
    <el-row>
      <el-col :span="12">
        <PictureView :id="mangaId" />
      </el-col>
      <el-col :span="12">
        <TextView :id="mangaId" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'manga_view',
  props: {
    mangaId: { type: String, required: true}
  },
  components: {
    PictureView,
    TextView
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>

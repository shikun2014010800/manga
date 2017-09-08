<template>
  <div id="app">
    <el-tabs type="card" v-model="activeTab" @tab-click="tabSwitch" ref="tab">
      <el-tab-pane label="Login" name="login">
        <Login />
      </el-tab-pane>
      <el-tab-pane label="Page" name="page">
        <MangaView />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Login from './Login'
import MangaView from './MangaView'

export default {
  name: 'main',
  components: {
    Login,
    MangaView,
  },
  data () {
    return {
      isDevMode: !!document.location.search.match('dev=1'),
      activeTab: this.$route.query.active_tab || 'login',
    };
  },
  methods: {
    tabSwitch() {
      this.$router.replace({ name: 'login', query: { active_tab: this.activeTab }})
    },
  },
}
</script>

<style>
.el-tabs {
  padding: 5px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.el-tabs__content {
  flex-grow: 1;
  flex-direction: column;
  height: calc(100% - 60px);
}
.el-tab-pane {
  overflow-y: scroll;
  height: 100%;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>

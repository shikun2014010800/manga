<template>
  <div id="app">
    <el-tabs type="card" v-model="activeTab" @tab-click="tabSwitch" ref="tab">
      <el-tab-pane label="Workouts" name="workout_list">
        <WorkoutList />
      </el-tab-pane>
      <el-tab-pane label="Flags" name="flags_manager">
        <FlagList />
      </el-tab-pane>
      <el-tab-pane label="Coaches" name="coach_manager">
        <CoachList />
      </el-tab-pane>
      <el-tab-pane label="Movements" name="movement_library">
        <MovementLibrary :loadVideosOnLoad="false" />
      </el-tab-pane>
      <el-tab-pane label="Text Templates" name="text_template_editor">
        <TextTemplateEditor />
      </el-tab-pane>
      <el-tab-pane label="Dev Panel" name="dev_panel">
        <DevPanel />
      </el-tab-pane>
      <el-tab-pane label="Re-Import Console" name="import_console">
        <ImportConsole />
      </el-tab-pane>
      <el-tab-pane label="Jenkins Console" name="jenkins_console">
        <JenkinsConsole />
      </el-tab-pane>
      <el-tab-pane label="BI Console" name="bi_console">
        <BIConsole />
      </el-tab-pane>
    </el-tabs>
    <GSControl style="position: absolute; top: 8px; right: 8px;" />
  </div>
</template>

<script>
import WorkoutList from './WorkoutList.vue'
import FlagList from './FlagList.vue'
import CoachList from './CoachList.vue'
import MovementLibrary from './MovementLibrary.vue'
import TextTemplateEditor from './TextTemplateEditor.vue'
import DevPanel from './DevPanel.vue'
import ImportConsole from './ImportConsole.vue'
import GSControl from '@/common/components/GSControl.vue'
import JenkinsConsole from './JenkinsConsole.vue'
import BIConsole from './BIConsole.vue'

export default {
  name: 'main',
  components: {
    WorkoutList,
    FlagList,
    CoachList,
    MovementLibrary,
    GSControl,
    DevPanel,
    ImportConsole,
    TextTemplateEditor,
    JenkinsConsole,
    BIConsole,
  },
  data () {
    return {
      isDevMode: !!document.location.search.match('dev=1'),
      activeTab: this.$route.query.active_tab || 'workout_list',
    };
  },
  methods: {
    setJenkinsError(err) {
      this.isJenkinsError = err
    },
    tabSwitch() {
      this.$router.replace({ name: 'root', query: { active_tab: this.activeTab }})
    },
    handleJenkinsError(e) {
      this.$notify.error({
        title: 'Jenkins error',
        message: 'Please go to Jenkins Console and resolve them'
      })
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

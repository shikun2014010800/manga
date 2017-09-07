<template>
  <div>
    <div>
      <el-row>
        <el-col :offset="3">
          <img v-bind:src="headImage"/>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :offset="3" :span="8">
        <div>
          <el-card>
            <p>提示</p>
            <p>现在为您服务的是设在北京的中央服务器</p>
            <p>請您首先選擇產品</p>
            <p>如果您的IP 已被授權，請直接登錄</p>
            <p>如果您的IP未被授權，請輸入用戶名和密碼後登錄</p>
            <p>有問題請聯繫管理員</p>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div>
            <el-row>
              <el-col :offset="9" :span="18">
                <el-radio-group v-model="librarySelection">
                  <el-radio label="ancient">古典</el-radio>
                  <el-radio label="recent">近代</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="3" :span="18">
                <el-input v-model="userName" placeholder="用户名" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="3" :span="18">
                <el-input v-model="password" placeholder="密码" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="6" :span="18">
                <el-button @click="login()">登录</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-checkbox v-model="shouldSave">保存?</el-checkbox>
              </el-col>
              <el-col :span="6">
                <template v-if="!ipAvailable">
                  您的IP {{ myIP }} 未被授权!
                </template>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="10">
        <div>
          <p>版權所有 Copyright © 2017</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ServerConfig from '@/common/utils/ServerConfig'

export default {
  name: 'login',

  computed: {
    ipAvailable () {
      return false
    },
    myIP () {
      return '127.0.0.1'
    },
    headImage() {
      const serverAddress = ServerConfig.serverUrl()
      console.log(`Server address = ${serverAddress}`)
      return `${serverAddress}/public/img/head.gif`
    }
  },
  data() {
    return {
      librarySelection: 'ancient',
      userName: '',
      password: '',
      shouldSave: false,
    }
  }
}
</script>
<style>

</style>

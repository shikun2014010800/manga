import Constant from './Constant.js'

// default will use staging as server
let serverConfig = {
  current_config: Constant.CONFIG_STAGING,
  staging_config: {
    name: 'staging',
    firebase_config: {
      apiKey: 'AIzaSyAI_AHdLjtcDiEMCngq0VzHFf6EFEpcWEk',
      authDomain: 'wasabi2015.firebaseapp.com',
      databaseURL: 'https://wasabi2015.firebaseio.com',
      storageBucket: 'firebase-wasabi2015.appspot.com'
    },
    api_server_config: {
      server_address: 'http://localhost:3000'
    },
    firebase_function_config: {
      server_address: 'https://us-central1-firebase-wasabi2015.cloudfunctions.net'
    },
    firebase_admin_user_id: 100
  },
  production_config: {
    name: 'production',
    firebase_config: {
      apiKey: 'AIzaSyBgerbFR2QGt3S_QfffUpmnvLM3MgxHTy4',
      authDomain: 'ctalias2015.firebaseapp.com',
      databaseURL: 'https://ctalias2015.firebaseio.com',
      storageBucket: 'firebase-ctalias2015.appspot.com'
    },
    api_server_config: {
      server_address: 'https://muscle.moov.cc'
    },
    firebase_function_config: {
      server_address: 'https://us-central1-ctalias2015.cloudfunctions.net'
    },
    firebase_admin_user_id: 100
  }
}

const SERVER_CONFIG_KEY = 'manga_server_config_key'
export default {
  saveServerConfig () {
    window.localStorage.setItem(SERVER_CONFIG_KEY, JSON.stringify(serverConfig))
  },
  loadServerConfig () {
    const configString = window.localStorage.getItem(SERVER_CONFIG_KEY)
    if (configString) {
      serverConfig = JSON.parse(configString)
    }
  },
  currentConfigType () {
    return serverConfig.current_config
  },
  setCurrentConfigType (configType) {
    if (configType === Constant.CONFIG_STAGING || configType === Constant.CONFIG_PRODUCTION) {
      serverConfig.current_config = configType
      this.saveServerConfig()
    }
  },
  currentConfig () {
    const configType = this.currentConfigType()
    return this.configByType(configType)
  },
  configByType (configType) {
    if (configType === Constant.CONFIG_STAGING) {
      return serverConfig.staging_config
    } else if (configType === Constant.CONFIG_PRODUCTION) {
      return serverConfig.production_config
    } else {
      console.log('error: cannot get proper configurations')
      return null
    }
  },
  currentFirebaseConfig () {
    const currentConfig = this.currentConfig()
    return currentConfig.firebase_config
  },
  // helper functions
  serverUrl () {
    const config = this.currentConfig()
    return config ? config.api_server_config.server_address : null
  },
  firebaseFunctionUrl () {
    const config = this.currentConfig()
    return config ? config.firebase_function_config.server_address : null
  },
  firebaseAdminUserId () {
    const config = this.currentConfig()
    return config ? config.firebase_admin_user_id : null
  },
  name() {
    const config = this.currentConfig()
    return config ? config.name : null
  }
}

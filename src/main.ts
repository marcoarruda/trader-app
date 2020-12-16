import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Amplify from 'aws-amplify'
import awsExports from './aws-exports'

Amplify.configure(awsExports)

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')

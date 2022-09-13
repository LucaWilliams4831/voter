import { createRouter, createWebHistory } from 'vue-router'

import Data from '../views/Data.vue'
import Portfolio from '../views/Portfolio.vue'
import Voter from '../views/Voter.vue'

const routerHistory = createWebHistory()
const routes = [
  { path: '/', component: Portfolio },
  { path: '/portfolio', component: Portfolio },
  { path: '/data', component: Data },
  { path: '/voter', component: Voter }
  
]

const router = createRouter({
  history: routerHistory,
  routes
})

export default router

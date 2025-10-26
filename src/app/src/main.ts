
import App from './App.vue'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle';

import './components/styles/common.scss'

import Items from './components/items.vue'
import Item from './components/item.vue'
import Bearer from './components/bearer.vue'

const routes = [
  { path: '/items', component: Items },
  { path: '/item/:id', component: Item },
  { path: '/bearer', component: Bearer },
  { path: '/', redirect: '/bearer' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
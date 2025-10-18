import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle';

import { createRouter, createWebHistory } from 'vue-router'

import Items from './components/items.vue'
import Item from './components/item.vue'

const routes = [
  { path: '/items', component: Items },
  { path: '/item/:id', component: Item },
  { path: '/', redirect: '/items' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
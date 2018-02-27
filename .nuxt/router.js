import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _06af3e6c = () => import('..\\pages\\Autor\\index.vue' /* webpackChunkName: "pages_Autor_index" */).then(m => m.default || m)
const _7c20b903 = () => import('..\\pages\\Kategorien\\_category.vue' /* webpackChunkName: "pages_Kategorien__category" */).then(m => m.default || m)
const _7b448406 = () => import('..\\pages\\Blog\\_slug.vue' /* webpackChunkName: "pages_Blog__slug" */).then(m => m.default || m)
const _34993587 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash && document.querySelector(to.hash)) {
        // scroll to anchor by returning the selector
        position = { selector: to.hash }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/Autor",
			component: _06af3e6c,
			name: "Autor"
		},
		{
			path: "/Kategorien/:category?",
			component: _7c20b903,
			name: "Kategorien-category"
		},
		{
			path: "/Blog/:slug?",
			component: _7b448406,
			name: "Blog-slug"
		},
		{
			path: "/",
			component: _34993587,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}

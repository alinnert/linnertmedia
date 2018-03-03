import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _2ee41caa = () => import('..\\pages\\autor\\index.vue' /* webpackChunkName: "pages_autor_index" */).then(m => m.default || m)
const _022a5923 = () => import('..\\pages\\kategorien\\_category.vue' /* webpackChunkName: "pages_kategorien__category" */).then(m => m.default || m)
const _0469f3c6 = () => import('..\\pages\\blog\\_slug.vue' /* webpackChunkName: "pages_blog__slug" */).then(m => m.default || m)
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
			path: "/autor",
			component: _2ee41caa,
			name: "autor"
		},
		{
			path: "/kategorien/:category?",
			component: _022a5923,
			name: "kategorien-category"
		},
		{
			path: "/blog/:slug?",
			component: _0469f3c6,
			name: "blog-slug"
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

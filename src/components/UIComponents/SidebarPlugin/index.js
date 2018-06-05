import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Home',
      icon: 'ti-home',
      path: '/dashboard/home'
    },
    {
      name: 'Teams',
      icon: 'ti-user',
      path: '/dashboard/teams'
    },
    {
      name: 'Search By Match',
      icon: 'ti-search',
      path: '/dashboard/searchmatch'
    },
    {
      name: 'Search Players',
      icon: 'ti-search',
      path: '/dashboard/searchplayer'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin

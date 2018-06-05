import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Home from 'src/components/Dashboard/Views/home.vue'
import Team from 'src/components/Dashboard/Views/teams.vue'
import SearchPlayer from 'src/components/Dashboard/Views/searchplayer.vue'
import SearchMatch from 'src/components/Dashboard/Views/searchmatch.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard/home'
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    redirect: '/dashboard/teams',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'teams',
        name: 'All Teams',
        component: Team
      },
      {
        path: 'searchmatch',
        name: 'Search Match',
        component: SearchMatch
      },
      {
        path: 'searchplayer',
        name: 'SearchPlayers',
        component: SearchPlayer
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes

<template>
  <div :class="sidebarClasses" :data-background-color="backgroundColor" :data-active-color="activeColor">
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo">
        <a href="#" class="simple-text">
          IPL Dashboard
        </a>
        <p>Season</p>
        <select v-model="selected" style="width: 180px;height: 35px;background-color: lightgray;border: 0;border-radius: 2px;cursor: pointer;">
          <option v-for="data in season" :key="data.Season_Id" :value="data.Season_Id">Season {{data.Season_Id}}</option>
        </select>
      </div>
      <slot>

      </slot>
      <ul :class="navClasses">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <router-link v-for="(link,index) in sidebarLinks" :to="link.path" tag="li" :ref="link.name">
          <a>
            <i :class="link.icon"></i>

            <p>{{link.name}}
            </p>
          </a>
        </router-link>
      </ul>
      <moving-arrow :move-y="arrowMovePx">

      </moving-arrow>
    </div>
  </div>
</template>
<script>
  import { EventBus } from '../../../event-bus.js'
  import MovingArrow from './MovingArrow.vue'
  import Season from '../../../assets/data/season.json'

  export default {
    props: {
      type: {
        type: String,
        default: 'sidebar',
        validator: (value) => {
          let acceptedValues = ['sidebar', 'navbar']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      backgroundColor: {
        type: String,
        default: 'black',
        validator: (value) => {
          let acceptedValues = ['white', 'black', 'darkblue']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      activeColor: {
        type: String,
        default: 'success',
        validator: (value) => {
          let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      sidebarLinks: {
        type: Array,
        default: () => []
      }
    },
    components: {
      MovingArrow
    },
    computed: {
      sidebarClasses () {
        if (this.type === 'sidebar') {
          return 'sidebar'
        } else {
          return 'collapse navbar-collapse off-canvas-sidebar'
        }
      },
      navClasses () {
        if (this.type === 'sidebar') {
          return 'nav'
        } else {
          return 'nav navbar-nav'
        }
      },
      /**
       * Styles to animate the arrow near the current active sidebar link
       * @returns {{transform: string}}
       */
      arrowMovePx () {
        return this.linkHeight * this.activeLinkIndex
      }
    },
    data () {
      return {
        linkHeight: 60,
        activeLinkIndex: 0,

        windowWidth: 0,
        isWindows: false,
        hasAutoHeight: false,
        selected: null,
        season: Season
      }
    },
    methods: {
      findActiveLink () {
        this.sidebarLinks.find((element, index) => {
          let found = element.path === this.$route.path
          if (found) {
            this.activeLinkIndex = index
          }
          return found
        })
      }
    },
    mounted () {
      this.findActiveLink()
    },
    watch: {
      $route: function (newRoute, oldRoute) {
        this.findActiveLink()
      },
      selected: function (newValue) {
        EventBus.$emit('seasonvalue', newValue)
      }
    }
  }

</script>
<style>

</style>

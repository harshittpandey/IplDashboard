<template>
  <div>
    <h3 v-if="selected===''" style="text-align:center">Please select season</h3>
    
    <div v-else>
    <span v-for="season in season">
      <span v-if="season.Season_Id===selected">
        <h2 style="text-align:center">Season {{season.Season_Id}}</h2>
        <h4 style="text-align:center">Season-Year: {{season.Season_Year}}</h4>
      </span>
    </span>

    <!--Stats cards-->
    <span v-for="season in season">
      <span v-if="season.Season_Id===selected">
        <div class="row">
          <stats-card class="col-lg-3 col-sm-6" style="margin:10px">
              <div class="icon-big text-center icon-warning"  slot="header">
                <i class="ti-cup"></i>
              </div>
              <div class="numbers" slot="content">
                <span v-for="player in players">
                  <span v-if="player.Player_Id===season.Orange_Cap_Id">
                   {{player.Player_Name}}
                  </span>
                </span> 
              </div>
              <div class="stats" slot="footer">
                Orange Cap
              </div>
            </stats-card>

            <stats-card class="col-lg-4 col-sm-6" style="margin:10px">
              <div class="icon-big text-center icon-success"  slot="header">
                <i class="ti-crown"></i>
              </div>
              <div class="numbers" slot="content">
                <span v-for="player in players">
                  <span v-if="player.Player_Id===season.Man_of_the_Series_Id">
                    {{player.Player_Name}}
                  </span>
                </span> 
              </div>
              <div class="stats" slot="footer">
                Man Of The Series
              </div>
            </stats-card>
            <stats-card class="col-lg-3 col-sm-6" style="margin:10px">
              <div class="icon-big text-center icon-danger" slot="header">
                <i class="ti-cup"></i>
              </div>
              <div class="numbers" slot="content">
                <span v-for="player in players">
                  <span v-if="player.Player_Id===season.Purple_Cap_Id">
                    {{player.Player_Name}}
                  </span>
                </span>
              </div>
              <div class="stats" slot="footer">
                Purple Cap
              </div>
            </stats-card>
        </div>
    </span>
    </span>

    <!--Charts-->
    <!-- <div class="row">

      <div class="col-xs-12">
        <chart-card :chart-data="usersChart.data" :chart-options="usersChart.options">
          <h4 class="title" slot="title">Users behavior</h4>
          <span slot="subTitle"> 24 Hours performance</span>
          <span slot="footer">
            <i class="ti-reload"></i> Updated 3 minutes ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Click
            <i class="fa fa-circle text-warning"></i> Click Second Time
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-xs-12">
        <chart-card :chart-data="preferencesChart.data"  chart-type="Pie">
          <h4 class="title" slot="title">Email Statistics</h4>
          <span slot="subTitle"> Last campaign performance</span>
          <span slot="footer">
            <i class="ti-timer"></i> Campaign set 2 days ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Bounce
            <i class="fa fa-circle text-warning"></i> Unsubscribe
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-xs-12">
        <chart-card :chart-data="activityChart.data" :chart-options="activityChart.options">
          <h4 class="title" slot="title">2015 Sales</h4>
          <span slot="subTitle"> All products including Taxes</span>
          <span slot="footer">
            <i class="ti-check"></i> Data information certified</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Tesla Model S
            <i class="fa fa-circle text-warning"></i> BMW 5 Series
          </div>
        </chart-card>
      </div>

    </div> -->
    </div>
  </div>
</template>
<script>
  import StatsCard from 'components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'
  import { EventBus } from '../../../event-bus.js'
  import Season from '../../../assets/data/season.json'
  import Player from '../../../assets/data/player.json'
  export default {
    components: {
      StatsCard,
      ChartCard
    },
    methods: {
      getSeason (value) {
        this.selected = value
      }
    },
    created () {
      EventBus.$on('seasonvalue', this.getSeason)
    },
    beforeDestroy () {
      EventBus.$off('seasonvalue')
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
        players: Player,
        season: Season,
        selected: '',
        statsCards: [
          {
            type: 'warning',
            icon: 'ti-cup',
            title: '',
            footerText: 'Orange Cap'
          },
          {
            type: 'success',
            icon: 'ti-crown',
            title: '',
            footerText: 'Man Of The Series'
          },
          {
            type: 'danger',
            icon: 'ti-cup',
            title: '',
            footerText: 'Purple Cap'
          }
        ],
        usersChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 562, 594, 626, 698, 895, 952],
              [67, 152, 193, 240, 387, 435, 535, 642, 744],
              [23, 113, 67, 108, 190, 239, 307, 410, 410]
            ]
          },
          options: {
            low: 0,
            high: 1000,
            showArea: true,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: this.$Chartist.Interpolation.simple({
              divisor: 3
            }),
            showLine: true,
            showPoint: false
          }
        },
        activityChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
              [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          }
        },
        preferencesChart: {
          data: {
            labels: ['62%', '32%', '6%'],
            series: [62, 32, 6]
          },
          options: {}
        }

      }
    }
  }

</script>
<style>

</style>

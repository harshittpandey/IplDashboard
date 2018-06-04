<template>
  <div >
    <div class="row">
    <div v-for="team in teams" class="col-lg-3 col-sm-6" >
      <button class="buttondesigned" data-toggle="modal" :value="team.Team_Id" @click="getteam($event)" data-target="#myModal">
      {{team.Team_Short_Code}}
      </button>
      <p style="margin-top:10px;margin-bottom:10px">{{team.Team_Name}}</p>
    </div>
    </div>

    <!-- Modal -->
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog" style="">
        
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <span v-for="team in teams">
                <span v-if="team.Team_Id==teamid">
                  <h4 class="modal-title">{{team.Team_Name}}</h4>
                </span>
              </span>
            </div>
            <div class=" modal-body">
                <select v-model="seasonselect" v-on:change="getresults">
                  <option disabled value="">Please select one</option>
                  <option value="1">Season 1</option>
                  <option value="2">Season 2</option>
                  <option value="3">Season 3</option>
                  <option value="4">Season 4</option>
                  <option value="5">Season 5</option>
                  <option value="6">Season 6</option>
                  <option value="7">Season 7</option>
                  <option value="8">Season 8</option>
                  <option value="9">Season 9</option>
                </select>
                <p>{{seasonselect}}</p>
                <vue-easy-pie-chart :percent="datame[teamid]*10" bar-color="blue" track-color="lightgrey" :size="size">
                  Win: {{datame[teamid]}}
                </vue-easy-pie-chart>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          
        </div>
      </div>    
  </div>
</template>
<script>
import team from '../../../assets/data/team.json'
import playermatch from '../../../assets/data/playermatch.json'
import player from '../../../assets/data/player.json'
import Match from '../../../assets/data/match.json'

import VueEasyPieChart from 'vue-easy-pie-chart'
import 'vue-easy-pie-chart/dist/vue-easy-pie-chart.css'
// import uniq from 'lodash/uniq'

export default {
  components: { VueEasyPieChart },
  data () {
    return {
      teams: team,
      teamid: 0,
      player: player,
      playermatch: playermatch,
      win: [],
      size: 210,
      datame: [60, 50, 60, 50, 60, 50, 60, 50, 60, 50, 60, 50, 25, 12],
      seasonselect: ''
    }
  },
  methods: {
    getteam (e) {
      const buttonValue = e.target.value
      this.teamid = buttonValue
    },
    getresults () {
      let win = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
      let s = this.seasonselect
      for (let i = 0; i < Match.length; i++) {
        if ((Match[i].IS_Result) && ((Match[i].Season_Id - s) === 0)) {
          win[Match[i].Match_Winner_Id]++
        }
      }
      this.datame = win
    }
  }
}

</script>
<style>
.buttondesigned {
  padding:25px;
  border-radius:50%;
  transform: rotate(-40deg);
  background-color:blue;
  color:white;
  font-size:30px;
  font-weight:500;
  margin-left:20px;
  font-family: Avant Garde, Avantgarde, Century Gothic, CenturyGothic, AppleGothic, sans-serif;
  border: 1px solid white
}
.modal-backdrop {
  z-index: 0!important;
  right:100%!important
}
</style>

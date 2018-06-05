<template>
  <div >
    <div class="row">
    <div v-for="team in teams" class="col-lg-3 col-sm-6" >
      <button class="buttondesigned" data-toggle="modal" :value="team.Team_Id" @click="getteam($event)" data-target="#myModal">
      <img  v-bind:src="'../../../../static/img/' + team.Team_Short_Code + '.png'" style="width: 100px;height: 100px">
      </button>
      <p style="margin-left: 10px;margin-top:10px;margin-bottom:10px">{{team.Team_Name}}</p>
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
               <select v-model="seasonselect" v-on:change="getresults" style="width: 200px;padding: 5px;border: 1px solid lightgray; border-radius: 2px; cursor: pointer;">
                  <option disabled value="">Please select Season</option>
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
                <div class="row">
                  <div class="col-lg-5 col-sm-6">
                    <vue-easy-pie-chart :percent="datame[teamid]*10" bar-color="green" track-color="lightgrey" :size="size">
                      Win: {{datame[teamid]}}
                    </vue-easy-pie-chart>
                  </div>
                  <div class="col-lg-5 col-sm-6">
                    <vue-easy-pie-chart :percent="datame2[teamid]*10" bar-color="red" track-color="lightgrey" :size="size">
                      Loss: {{datame2[teamid]}}
                    </vue-easy-pie-chart>
                  </div>
                </div>
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
      size: 180,
      datame: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      datame2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
      let loss = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
      for (let i = 0; i < Match.length; i++) {
        let t1 = Match[i].Team_Name_Id
        let t2 = Match[i].Opponent_Team_Id
        let t3 = t1 + t2
        t3 = t3 - Match[i].Match_Winner_Id
        if ((Match[i].IS_Result === 1) && (Match[i].Win_Type !== 'Tie') && ((Match[i].Season_Id - s) === 0)) {
          loss[t3]++
        }
      }
      console.log(loss)
      this.datame2 = loss
    }
  }
}

</script>
<style>
.buttondesigned {
  padding:25px;
  border-radius:50%;
  background-color:lightgray;
  color:white;
  font-size:30px;
  font-weight:500;
  margin-left:20px;
  font-family: Avant Garde, Avantgarde, Century Gothic, CenturyGothic, AppleGothic, sans-serif;
  border: 0
}
.modal-backdrop {
  z-index: 0!important;
  right:100%!important
}
</style>

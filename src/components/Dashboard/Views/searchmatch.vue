<template>
    <div class="row">
      <p v-if="selected">Season {{selected}}</p>
      <p v-else class="card" style="border-radius: 0;width: 200px; padding: 10px; background-color: red;color: white">Please Select Season</p>
    <div v-if="searchbar">  
      <select v-model="team1" style="border: 1px solid lightgray; padding: 5px;cursor: pointer;margin-left: 20%">
        <option disabled value="">Please select a team</option>
        <option v-for="team in teams">{{team.Team_Name}}</option>
      </select>
      <select v-model="team2" style="border: 1px solid lightgray; padding: 5px;cursor: pointer">
        <option disabled value="">Please select a team</option>
        <option v-for="team in teams">
          <span v-if="team.Team_Name===team1" style="cursor: not-allowed"></span>
          <span v-else>
            {{team.Team_Name}}
          </span>
        </option>
      </select>
      <p></p>
      <button style="margin-left: 38%; padding: 5px 10px; border: 1px solid gray; background-color: green; color: white" v-on:click="collectdata">
        Search
      </button>
    </div>
    <div v-else>
      <button v-on:click="close" style="margin-left: 38%; padding: 5px 10px; border: 1px solid gray; background-color: red; color: white"> close</button>
    </div>

      <hr style="border-color: #878787">
      <p style="text-align: center;">team 1: {{team1}}<span ><b>  V/S  </b></span> team 2: {{team2}}</p>
      <div v-for="smatch in matches" >
        <span v-for="matchid in selectedmatchId">
          <span v-if="smatch.Match_Id==matchid">
            <div class="card bg-light text-dark" style="padding: 15px;margin-left: 10px;margin-right: 10px">
              <div class="card-body">
                <span v-if="smatch.IS_Result">
                    <span v-if="team1==smatch.Match_Winner_Id">
                      <h4><span style="color: green">{{team1}}</span> v/s <span style="color: red">{{team2}}</span> (Season {{selected}})</h4>
                    </span>
                    <span v-else>
                      <h4><span style="color: red">{{team1}}</span> v/s <span style="color: green">{{team2}}</span> (Season {{selected}})</h4>
                    </span>
                </span>
                <span v-else>
                  <h4>{{team1}} v/s {{team2}} (Season {{selected}})</h4>
                </span>
                <hr>
                <p style="text-align: center;letter-spacing: 4px">DATE: {{smatch.Match_Date}}</p>
                <p v-for="team in teams">
                  <span v-if="smatch.Match_Winner_Id===team.Team_Id">
                    {{team.Team_Name}} Won By 
                    <span v-if="smatch.Win_Type==='by runs'" style="text-decoration: underline;">{{smatch.Won_By}} runs</span>
                    <span v-else style="text-decoration: underline;">{{smatch.Won_By}} wickets</span>
                  </span>
                </p>
                <hr>
                <p>Venue Name: {{smatch.Venue_Name}}</p>
                <p>City Name: {{smatch.City_Name}}</p>
                <p>Country: {{smatch.Host_Country}}</p>
                <button data-toggle="modal" :data-target="datatarget" :value="smatch.Match_Id" @click="getmatchid($event)" style="margin-left: 38%; padding: 5px 10px; border: 1px solid lightgray; background-color: lightgray; color: black;text-align: center;">Check More</button>
              </div>
            </div>
          </span>
        </span>

        <div class="modal fade" id="myModal" role="dialog" v-if="smatch.Match_Id==getmatch">
        <div class="modal-dialog" style="width: 1000px">
        
          <!-- Modal content-->
          <div class="modal-content" >
            <div class="modal-header">
              <button type="button" class="close" @click="resetdatatarget()" data-dismiss="modal">&times;</button>
              <h4 style="text-align: center;">{{team1}} v/s {{team2}}</h4>
              <p style="text-align: center;letter-spacing: 4px">Date: {{smatch.Match_Date}}</p>
            </div>
            <div class=" modal-body" >
                <p style="text-align: center;">Season : {{smatch.Season_Id}}</p>
                <h4 v-for="team in teams" style="text-align: center;color: green">
                  
                  <span v-if="smatch.Match_Winner_Id===team.Team_Id">
                    {{team.Team_Name}} Won By 
                    <span v-if="smatch.Win_Type==='by runs'" style="text-decoration: underline;">{{smatch.Won_By}} runs</span>
                    <span v-else style="text-decoration: underline;">{{smatch.Won_By}} wickets</span>
                  </span>
                </h4>
                <hr>
                <div class="row">
                  <div class="card col-lg-3 col-sm-6" style="text-align: center;margin-left: 20px;width: 400px; padding: 10px; background-color: #E6E2E2">
                    <p>Venue Name   : {{smatch.Venue_Name}} </p>
                    <p>City Name    : {{smatch.City_Name}} </p>
                    <p>Host_Country : {{smatch.Host_Country}} </p>
                  </div>
                  <div>
                    <h4 style="text-align: center;">Venue Details</h4>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-6 col-sm-6">
                    <h4 style="text-align: center;">Toss</h4>
                  </div>
                  <div class="card col-lg-6 col-sm-6" style="text-align: center;margin-left: 20px;width: 400px; padding: 10px; background-color: #E6E2E2">
                    <p>Toss Winner  :<span v-for="teamname in teams"><span v-if="teamname.Team_Id==smatch.Toss_Winner_Id"> {{teamname.Team_Name}} </span> </span></p>
                    <p>Toss Decision    : {{smatch.Toss_Decision}} </p>
                  </div>

                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="resetdatatarget()" data-dismiss="modal">Close</button>
            </div>
          </div>
          
        </div>
      </div>

      </div>
    </div>
</template>
<script>
import { EventBus } from '../../../event-bus.js'
import team from '../../../assets/data/team.json'
import match from '../../../assets/data/match.json'
export default {
  data () {
    return {
      matches: match,
      teams: team,
      team1: '',
      team2: '',
      selected: '',
      opponentid: '',
      opponent2id: '',
      selectedmatchId: [],
      searchbar: 1,
      getmatch: 1,
      datatarget: ''
    }
  },
  methods: {
    resetdatatarget () {
      this.datatarget = ''
    },
    getmatchid (e) {
      const buttonValue = e.target.value
      this.getmatch = buttonValue
      this.datatarget = '#myModal'
      console.log(this.getmatch)
    },
    cleareverything () {
      console.log('he')
    },
    getSeason (value) {
      this.selected = value
    },
    close () {
      this.searchbar = 1
      this.selectedmatchId = []
    },
    collectdata () {
      this.searchbar = 0
      for (var i = 0; i < team.length; i++) {
        if (team[i].Team_Name === this.team1) {
          this.opponent1id = team[i].Team_Id
        }
        if (team[i].Team_Name === this.team2) {
          this.opponent2id = team[i].Team_Id
        }
      }
      // console.log(this.opponent1id + 'and' + this.opponent2id)
      this.showmatch()
    },
    showmatch () {
      for (var i = 0; i < match.length; i++) {
        if ((match[i].Team_Name_Id === this.opponent1id) || (match[i].Team_Name_Id === this.opponent2id)) {
          if ((match[i].Opponent_Team_Id === this.opponent1id) || (match[i].Opponent_Team_Id === this.opponent2id)) {
            if (this.selected) {
              if (match[i].Season_Id === this.selected) {
                this.selectedmatchId[i] = match[i].Match_Id
                console.log(this.selectedmatchId[i])
              }
            } else {
              alert('please select Season for better results')
            }
          }
        }
      }
    }
  },
  created () {
    EventBus.$on('seasonvalue', this.getSeason)
  },
  beforeDestroy () {
    EventBus.$off('seasonvalue')
  }
}
</script>
<style>

</style>

<template>
    <div class="row">
      <p v-if="selected">Season {{selected}}</p>
      <p v-else>Please Select Season</p>
    <div v-if="searchbar">  
      <select v-model="team1" >
        <option disabled value="">Please select a team</option>
        <option v-for="team in teams">{{team.Team_Name}}</option>
      </select>
      <select v-model="team2">
        <option disabled value="">Please select a team</option>
        <option v-for="team in teams">
          <span v-if="team.Team_Name===team1" style="cursor: not-allowed"></span>
          <span v-else>
            {{team.Team_Name}}
          </span>
        </option>
      </select>

      <button v-on:click="collectdata">
        Search
      </button>
    </div>
    <div v-else>
      <button v-on:click="close"> close</button>
    </div>

      <hr style="border-color: #878787">
      <p>team 1: {{team1}}</p>
      <p>team 2: {{team2}}</p>
      <div v-for="smatch in matches" >
        <span v-for="matchid in selectedmatchId">
          <span v-if="smatch.Match_Id==matchid">
            <div class="card bg-light text-dark" style="padding: 15px;margin-left: 10px;margin-right: 10px">
              <div class="card-body">
                <span v-if="team1==smatch.Match_Winner_Id">
                  <h4><span style="color: green">{{team1}}</span> v/s <span style="color: red">{{team2}}</span> (Season {{selected}})</h4>
                </span>
                <span v-else>
                  <h4><span style="color: red">{{team1}}</span> v/s <span style="color: green">{{team2}}</span> (Season {{selected}})</h4>
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
                <button data-toggle="modal" data-target="#myModal" style="text-align: center;">Check More</button>
              </div>
            </div>
          </span>
        </span>
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
      searchbar: 1
    }
  },
  methods: {
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

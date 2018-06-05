<template>
 <div>
    <select v-model="battinghand" style="border: 1px solid lightgray; padding: 5px;cursor: pointer;margin-left: 20%">
      <option disabled value="">Please select Batting Hand</option>
      <option value="Left_Hand">Left Hand</option>
      <option value="Right_Hand">Right Hand</option>
    </select>


    <select v-model="bowlingskill" style="border: 1px solid lightgray; padding: 5px;cursor: pointer;margin-left: 5%">
      <option disabled value="">Please select Bowling Skill</option>
      <option value="Right-arm medium">Right-arm medium</option>
      <option value="Right-arm offbreak">Right-arm offbreak</option>
      <option value="Right-arm fast-medium">Right-arm fast-medium</option>
      <option value="Legbreak">Legbreak</option>
      <option value="Legbreak googly">Legbreak googly</option>
      <option value="Right-arm medium-fast">Right-arm medium-fast</option>
      <option value="Left-arm fast-medium">Left-arm fast-medium</option>
      <option value="Slow left-arm orthodox">Slow left-arm orthodox</option>
      <option value="Slow left-arm chinaman">Slow left-arm chinaman</option>
    </select>

    <hr>

    <div v-for="player in player" >
      <span v-if="battinghand">
          <span v-if="bowlingskill">
            <span v-if="(player.Batting_Hand==battinghand)&&(player.Bowling_Skill==bowlingskill)">
              <div class="card" style="width: 200px; padding: 5px 10px; border: 1px solid gray;">
                <div class="card-header">
                  <h3>{{player.Player_Name}}</h3>
                  <hr>
                </div>
                <div class="card-body">
                  <p v-if="player.Batting_Hand !== 'null'">
                    Batting Hand : {{player.Batting_Hand}}
                  </p>
                  <p v-if="player.Batting_Hand !== 'null'">
                    Bowling Skill : {{player.Bowling_Skill}}
                  </p>
                  <p>
                    Country : {{player.Country}}
                  </p>
                  <p>
                    Date Of Birth : {{player.DOB}}
                  </p>
                  <p v-if="player.Is_Umpire">
                    Is Umpire : Yes
                  </p>
                </div> 
              </div>
            </span>
          </span>
          <span v-else>
            <span v-if="player.Batting_Hand==battinghand">
              <p> {{player}} </p>
            </span>
          </span>
      </span>
      <span v-else>
        <span v-if="bowlingskill">
          <span v-if="player.Bowling_Skill==bowlingskill">
              <p> {{player}} </p>
            </span>
        </span>
      </span>
    </div>

  </div>
  </div>


 </div>
</template>
<script>
import player from '../../../assets/data/player.json'
export default {
  data () {
    return {
      player: player,
      battinghand: '',
      bowlingskill: '',
      country: ''
    }
  },
  methods: {
  }
}

</script>
<style>

</style>

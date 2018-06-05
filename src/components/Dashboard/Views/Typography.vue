<template>
 <div>
    <select v-model="battinghand">
      <option disabled value="">Please select Batting Hand</option>
      <option value="Left_Hand">Left Hand</option>
      <option value="Right_Hand">Right Hand</option>
    </select>


    <select v-model="bowlingskill">
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

    <div v-for="player in player">
      <span v-if="battinghand">
          <span v-if="bowlingskill">
            <span v-if="(player.Batting_Hand==battinghand)&&(player.Bowling_Skill==bowlingskill)">
              <p> {{player}} </p>
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

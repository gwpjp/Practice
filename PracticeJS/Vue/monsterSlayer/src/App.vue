<template>
  <div id="app">
    <div class="container">
      <div class="name">You</div>
      <div class="name">Monster</div>
    </div>
    <div class="container">
      <div class="bar">
        <div id="playerLife" class="life" :style="{ width: playerLife + '%' }">
          {{ playerLife }}
        </div>
      </div>
      <div class="bar">
        <div id="monsterLife" class="life" :style="{ width: monsterLife + '%' }">
          {{ monsterLife }}
        </div>
      </div>
    </div>
    <div class="container">
      <button v-if="!play" @click="startGame" style="background-color: greenyellow" class="button" >
        START NEW GAME
      </button>
      <button v-if="play" @click="attack" style="background-color: red" class="button" >
        ATTACK
      </button>
      <button v-if="play" @click="special" style="background-color: orange" class="button" >
        SPECIAL ATTACK
      </button>
      <button v-if="play" @click="heal" style="background-color: greenyellow" class="button" >
        HEAL
      </button>
      <button v-if="play" @click="give" style="background-color: white" class="button" >
        GIVE UP
      </button>
    </div>
    <div id="actions">
      <div v-for="(action, index) in actions" :key="index">
        <div class="action" style="background-color: pink; color: red">
           {{ action.monster }}
         </div>
        <div class="action" style="background-color: lightblue; color: blue">
          {{ action.player }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      playerLife: 100,
      monsterLife: 100,
      play: false,
      actions: [],
    };
  },
  methods: {
    startGame() {
      this.play = true;
      this.playerLife = 100;
      this.monsterLife = 100;
      this.actions = [];
    },
    checkWin() {
      if (this.playerLife === 0) {
        confirm('You lose.');
        this.give();
      } else if (this.monsterLife === 0) {
        confirm('You win.');
        this.give();
      }
    },
    attack() {
      const playerHit = Math.floor(Math.random() * 10);
      const monsterHit = Math.floor(Math.random() * 10);
      this.playerLife = Math.max(0, this.playerLife -= playerHit);
      this.monsterLife = Math.max(0, this.monsterLife -= monsterHit);
      this.actions.push({
        monster: `MONSTER HITS PLAYER FOR ${playerHit}`,
        player: `PLAYER HITS MONSTER FOR ${monsterHit}`,
      });
      this.checkWin();
    },
    special() {
      const playerHit = Math.floor(Math.random() * 10);
      const monsterHit = Math.floor(Math.random() * 15);
      this.playerLife = Math.max(0, this.playerLife -= playerHit);
      this.monsterLife = Math.max(0, this.monsterLife -= monsterHit);
      this.actions.push({
        monster: `MONSTER HITS PLAYER FOR ${playerHit}`,
        player: `PLAYER HITS MONSTER FOR ${monsterHit}`,
      });
      this.checkWin();
    },
    heal() {
      const playerHit = Math.floor(Math.random() * 10);
      const monsterHit = Math.floor(Math.random() * 10);
      this.playerLife = Math.min(100, this.playerLife += playerHit);
      this.monsterLife = Math.min(100, this.monsterLife += monsterHit);
      this.actions.push({
        monster: `MONSTER HEALS FOR ${monsterHit}`,
        player: `PLAYER HEALS FOR ${playerHit}`,
      });
    },
    give() {
      this.play = false;
      this.actions = [];
    },
  },

};
</script>

<style>
#app {

}

.container{
  display: flex;
  width: 80%;
  margin: auto;
  margin-top: 10px;
  justify-content: space-around;
  padding: 10px;
}

.name{
  font-weight: bold;
  font-size: 22px;
}

.bar{
  width: 150px;
  height: 20px;
  background-color: gray;
}

.life{
  height: 100%;
  background-color: green;
  color: white;
  text-align: center;
  font-weight: normal;
  font-size: 13px;
}

.button{
  padding: 5px;
}

.action {
  margin-top: 5px;
  text-align: center;
}

#actions {
  width: 80%;
  margin: auto;
}
</style>

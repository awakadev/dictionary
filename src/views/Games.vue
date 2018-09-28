<template>
    <div class="games">
        <h3>{{game.correct.english}}</h3>
        <div class="container">
            <div v-for="(option, index) in game.options" :key="index" class="cell">
                <el-button type="text" @click="answer(index)" :disabled="disabled">{{option}}</el-button>
            </div>
        </div>
        <el-tag v-if="correct === 'success'">{{correct}}</el-tag>
        <el-tag type="danger" v-if="correct === 'error'">{{correct}}</el-tag>
    </div>
</template>

<script>
export default {
  name: 'Games',

  data () {
    return {
      words: this.$store.getters.words,
      game: this.$store.getters.newGame,
      correct: '',
      disabled: false
    }
  },

  methods: {
    answer (index) {
      if (this.game.correct.russian === this.game.options[index]) {
        this.correct = 'success'
        this.disabled = true

        setTimeout(() => {
          this.$store.dispatch('newGame')
            .then(() => {
              this.game = this.$store.getters.newGame
              this.correct = ''
              this.disabled = false
            })
        }, 1500)
      } else {
        this.correct = 'error'
        this.disabled = true
        this.game.options.splice(index, 1)
        this.game.words.splice(index, 1)

        setTimeout(() => {
          this.correct = ''
          this.disabled = false
        }, 500)
      }
    }
  },

  created () {
    if (this.words.length === 0) {
      this.$store.dispatch('getWords')
        .then(() => {
          this.$store.dispatch('newGame')
        })
        .then(() => {
          this.game = this.$store.getters.newGame
        })
    }
  }
}
</script>

<style scoped>
    .container {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-top: 10px;
    }
    .cell {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-right: 12px;
    }
</style>

<template>
    <div class="dictionary">
        <el-input placeholder="Search" v-model="search" style="width: 180px;"></el-input>
        <div v-for="(date, index) in allWordsGrouped" :key="index">
            <h2>{{index}}</h2>
            <hr>
            <div v-for="(word, index) in date" :key="index" class="list">
            {{word.english}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Dictionary',

  data () {
    return {
      search: ''
    }
  },

  computed: {
    allWords () {
      let words = this.$store.getters.allWords
      return words.filter(word => {
        return (word.english.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || word.russian.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || word.example.toLowerCase().indexOf(this.search.toLowerCase()) > -1 )
      })
    },
    allWordsGrouped () {
      return this.allWords.reduce((r, a) => {
        r[a.date] = r[a.date] || []
        r[a.date].push(a)
        return r
      }, {})
    }
  },

  created () {
    if (this.allWords.length === 0) {
      this.$store.dispatch('getAllWords')
    }
  }

}
</script>

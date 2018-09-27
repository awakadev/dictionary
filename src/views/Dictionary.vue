<template>
    <div class="dictionary">
        <el-input placeholder="Search" v-model="search" style="width: 180px;"></el-input>
        <div v-for="(date, index) in groupedWords" :key="index">
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
    words () {
      return this.$store.getters.words
    },
    filteredWords () {
      return this.words.filter(word => {
        return (word.english.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || word.russian.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || word.example.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
      })
    },
    groupedWords () {
      return this.filteredWords.reduce((r, a) => {
        r[a.date] = r[a.date] || []
        r[a.date].push(a)
        return r
      }, {})
    }
  },

  created () {
    if (this.words.length === 0) {
      this.$store.dispatch('getWords')
    }
  }
}
</script>

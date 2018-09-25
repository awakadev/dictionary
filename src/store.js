import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    words: []
  },
  getters: {
    today (state) {
      let date = new Date()
      return date.toLocaleString('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }).split('.').reverse().join('-')
    },
    words (state) {
      return state.words
    }
  },
  mutations: {
    SET_WORDS (state, words) {
      state.words = words
    },
    PUSH_WORD (state, { english, russian, example, date }) {
      state.words.push({ english, russian, example, date })
    }
  },
  actions: {
    addNewWord ({ commit, getters }, { english, russian, example, date }) {
      return firebase.database().ref('words').push({ english, russian, example, date })
        .then(data => {
          commit('PUSH_WORD', { english, russian, example, date })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTodayWords ({ commit, getters }) {
      let words = []
      return firebase.database().ref('words').orderByChild('date').equalTo(getters.today).once('value')
        .then(data => {
          let obj = data.val()
          for (let key in obj) {
            words.push({
              english: obj[key].hasOwnProperty('english') ? obj[key].english : '',
              russian: obj[key].hasOwnProperty('russian') ? obj[key].russian : '',
              example: obj[key].hasOwnProperty('example') ? obj[key].example : '',
              date: obj[key].hasOwnProperty('date') ? obj[key].date : ''
            })
          }
          commit('SET_WORDS', words)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})

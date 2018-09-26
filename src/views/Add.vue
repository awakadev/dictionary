<template>
    <div class="add">
        <h1>Add new word</h1>
        <el-form :model="word" :rules="rules" ref="wordForm"  v-if="add">
            <el-row :gutter="20">
                <el-col :xs="12" :sm="10" :md="8" :lg="6">
                    <el-form-item prop="english">
                        <el-input v-model="word.english" placeholder="english"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="10" :md="8" :lg="6">
                    <el-form-item prop="russian">
                        <el-input v-model="word.russian" placeholder="russian"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="20" :md="16" :lg="12">
                    <el-form-item prop="example">
                        <el-input v-model="word.example" placeholder="example" type="textarea" :rows="2"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-button type="primary" plain style="float: left" @click="submitForm('wordForm')">add new word</el-button>
                    <el-button type="danger" plain style="float: left" @click="add = !add">cancel</el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-row v-else>
            <el-col><el-button type="primary" icon="el-icon-plus" circle style="float: left" @click="add = !add"></el-button></el-col>
        </el-row>
        <h2 class="sub-title">Today words</h2>
            <div v-for="(word, index) in words" :key="index" class="list">
                {{word.english}}
            </div>
    </div>
</template>

<script>
export default {
  name: 'Add',

  data () {
    const validateCyrillic = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input field'))
      } else {
        if (!/^[?!,.а-яА-ЯёЁ0-9\s]+$/g.test(value)) {
          callback(new Error('Please input English word'))
        } else {
          callback()
        }
      }
    }
    const validateLatin = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input field'))
      } else {
        if (!/^[?!,.a-zA-Z0-9\s]+$/g.test(value)) {
          callback(new Error('Please input English word'))
        } else {
          callback()
        }
      }
    }

    return {
      add: false,
      word: {
        english: '',
        russian: '',
        example: ''
      },
      rules: {
        english: [
          { validator: validateLatin, trigger: 'blur' }
        ],
        russian: [
          { validator: validateCyrillic, trigger: 'blur' }
        ],
        example: [ ]
      }
    }
  },

  computed: {
    words () {
      return this.$store.getters.words
    }
  },

  methods: {
    addNewWord () {
      console.log('add')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('addNewWord', {
            english: this.word.english,
            russian: this.word.russian,
            example: this.word.example,
            date: this.$store.getters.today
          })
            .then(res => {
              this.add = false
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          return false
        }
      })
    }
  },

  created () {
    this.$store.dispatch('getTodayWords')
  }
}
</script>

<style>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #409EFF;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }
    .list {
        /*text-align: start;*/
        padding: 6px 0;
    }
    .sub-title {
        border-bottom: 1.5px solid #2c3e50;
    }
</style>

<template>
  <el-container id="app">
    <el-header id="nav">
      <router-link to="/">Add</router-link> |
      <router-link to="/dictionary">Dictionary</router-link> |
      <router-link to="/statistics">Statistics</router-link>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

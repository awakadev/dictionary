<template>
  <el-container id="app">
    <el-header id="nav">
      <router-link to="/">About</router-link> |
      <router-link to="/add">Add</router-link> |
      <router-link to="/dictionary">Dictionary</router-link> |
      <router-link to="/games">Games</router-link> |
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
  /*text-align: center;*/
  color: #2c3e50;
  a {
    color: #2c3e50;
    &:hover {
      color: mix(#fff , #2c3e50, 20%);
    }
  }
}
#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

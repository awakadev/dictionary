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

</style>

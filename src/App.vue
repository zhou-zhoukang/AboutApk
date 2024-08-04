<template>
  <div class="home">
    <el-container class="container">
      <el-header class="head">
          <el-container>
            <el-aside style="text-align: center;padding-top: 10px;height: 100%" >
              <img src="@/assets/logo.svg" alt="ScamDetector Logo" style="top:5px;position: relative; right:5px;width: calc(1.275rem + .3vw)"/>
              <text class="title">ScamDetector</text>
            </el-aside>
            <el-main>
              <el-row :gutter="30" font-size="calc(1rem + .3vw)">
                <el-col :span="3">
                  <router-link to="/page/home" class="navigation-link">
                    APK解析
                  </router-link>
                </el-col>
                <el-col :span="3">
                  <router-link to="/page/blacklist" class="navigation-link">
                    黑白名单
                  </router-link>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
      </el-header>
      <el-main class="outside">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: "APP"
}
</script>

<style>
#app{
  padding: 0 0 0 0;
  width: 100vw;
  height: 100%;
  background-size: cover;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style scoped>
.home{
  width: 99vw;
  position: absolute;
  padding:0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fafafa;
}

.container{
  height: 100%;
  width: 100%;
  padding:0
}

.head{
  height: 70px;
  width: 100%;
  border-color: #e9ecef;
  border-bottom:1px solid #dee2e6;
  margin-bottom: 10px;
  padding-bottom: 5px;
  background-color: white;
}

.outside{
  width: 100%;
  height: auto;
  position: relative;
}

.title{
  text-align: center;
  font-size: calc(1.275rem + .3vw);
  font-weight: 600;
  letter-spacing:-1px;
}

.navigation-link {
  font-size: 20px;
  color: black;
}
.navigation-link:hover{
  color: white;
  background-color: #725feb;
  padding: 15px;
  border-radius: 4px;
}
</style>

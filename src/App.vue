<script setup>
import {Setting} from "@element-plus/icons-vue";
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="home">
    <el-container class="container">
      <el-header class="header">
        <el-aside
            style="text-align: center; padding-top: 10px; height: 100%"
        >
          <img
              src="/logo.svg" alt="ScamDetector Logo"
              style="top:5px; position: relative; right:5px; width: calc(1.275rem + .3vw)"
          />
          <text class="title">ScamDetector</text>
        </el-aside>

        <el-menu
            :default-active="activeIndex"
            class="menu"
            mode="horizontal"
        >
          <el-menu-item
              @click="clickMenu(item)"
              v-for="item in menuData" :key="item.name"
              :index="item.name"
          >
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.label }}</span>
          </el-menu-item>

          <el-sub-menu
              index="2"
          >
            <template #title><el-icon><Setting /></el-icon> 设置</template>
            <el-menu-item
                index="2-1"
                @click="toggleDark()"
            >
              切换主题
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>

      <el-main class="main">
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" v-if="$route.meta.keepAlive"/>
          </KeepAlive>
          <component :is="Component" v-if="!$route.meta.keepAlive"/>
        </RouterView>
      </el-main>

    </el-container>
  </div>
</template>

<script>
import {DataAnalysis, House, List} from "@element-plus/icons-vue";

export default {
  name: "APP",
  data() {
    return {
      activeIndex: '1',
      menuData: [
        {
          path: "/page/home",
          name: "home",
          label: "APK解析",
          icon: House
        },
        {
          path: "/page/analysis_list",
          name: "analysis_list",
          label: "分析列表",
          icon: DataAnalysis
        },
        {
          path: "/page/blacklist",
          name: "blacklist",
          label: "黑白名单",
          icon: List
        }
      ]
    };
  },
  methods: {
    clickMenu(item) {
      if (this.$route.path !== item.path && !(this.$route.path === '/page/home' && (item.path === '/'))) {
        this.$router.push(item.path)
      }
    }
  }
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
.home {
  width: 100vw;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.container{
  height: 100%;
  width: 100%;
}

.header {
  display: flex;
  flex-direction: row;
  border-color: #e9ecef;
  border-bottom:1px solid #dee2e6;
}

.menu {
  width: 100%;
}

.main{
  padding-top: 5px;
  width: 100%;
  height: 100%;
  position: relative;
}

.title{
  text-align: center;
  font-size: calc(1.275rem + .3vw);
  font-weight: 600;
  letter-spacing:-1px;
}
</style>

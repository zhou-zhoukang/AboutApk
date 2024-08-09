<script setup lang="ts">
import {onMounted, ref} from "vue";
import BlacklistService from "@/service/BlacklistService";

const whitelistData = ref<ApkWhitelist[]>([])

onMounted(() => {
  BlacklistService.findAllWhitelist()
      .then(response => {
        whitelistData.value = response
      })
})

const handleWhitelistEdit = (index: number, apkWhitelist: ApkWhitelist) => {

}

const handleWhitelistDelete = (index: number, apkWhitelist: ApkWhitelist) => {

}

</script>

<template>
  <div class="blacklist-page-container">
    <div class="title-container">
      <h2 class="title-name">APK 白名单配置</h2>
    </div>

    <el-table
        :data="whitelistData"
        border stripe
        align="center"
        height="100%"
        style="width: 70%; margin:auto"
    >
      <el-table-column
          prop="packageName"
          label="包名"
          width="300">
      </el-table-column>
      <el-table-column
          prop="appName"
          label="应用名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="md5"
          label="摘要信息"
          width="300">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="300">
        <template #default="scope">
          <el-button
              icon="edit"
              @click="handleWhitelistEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              type="danger"
              icon="delete"
              @click="handleWhitelistDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.blacklist-page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.title-container {
  text-align: center;
}

.title-name {
  font-weight: bold;
}
</style>
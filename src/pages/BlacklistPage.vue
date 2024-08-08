<script setup lang="ts">
import {onMounted, ref} from "vue";
import BlacklistService from "@/service/BlacklistService";

interface ApkWhitelist {
  id: number,
  packageName: string,
  appName: string,
  md5: string
}

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
  <el-table
      :data="whitelistData"
      border
      style="width: 100%">
    <el-table-column
        fixed
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
            @click="handleWhitelistEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
            type="danger"
            @click="handleWhitelistDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
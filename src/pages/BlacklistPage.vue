<script setup lang="ts">
import {onMounted, ref} from "vue";
import BlacklistService from "@/service/BlacklistService";

const whitelistData = ref<ApkWhitelist[]>([])
const currentData = ref<ApkWhitelist>({
  id: 0,
  packageName: "",
  appName: "",
  md5: ""
})
const dialogVisible = ref(false)
const addOrUpdate = ref("添加")

onMounted(() => {
  BlacklistService.findAllWhitelist()
      .then(response => {
        whitelistData.value = response
      })
})

const handleWhitelistAdd = () => {
  dialogVisible.value = true
  addOrUpdate.value = "添加"

}

const handleWhitelistEdit = (index: number, apkWhitelist: ApkWhitelist) => {
  dialogVisible.value = true
  addOrUpdate.value = "修改"

}

const handleWhitelistDelete = (index: number, apkWhitelist: ApkWhitelist) => {

}

const handleAddOrUpdate = () => {

}

const CloseDialog = () => {
  dialogVisible.value = false
}
</script>

<template>
  <el-container class="blacklist-page-container">
    <div class="title-container">
      <h2 class="title-name">APK 白名单配置</h2>
    </div>

    <div class="search-container">
      <el-button
        icon="plus"
        @click="handleWhitelistAdd()"
      >
        添加
      </el-button>
    </div>

    <el-table
        :data="whitelistData"
        border stripe
        align="center"
        height="100%"
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


  </el-container>

  <el-dialog
      :title="addOrUpdate"
      v-model="dialogVisible"
  >
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="CloseDialog">关闭</el-button>
        <el-button type="primary" color="#725feb" @click="handleAddOrUpdate">
          {{ addOrUpdate }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.blacklist-page-container {
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: auto;
}

.title-container {
  text-align: center;
}

.title-name {
  font-weight: bold;
}

.search-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
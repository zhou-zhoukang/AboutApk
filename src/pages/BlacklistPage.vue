<script setup lang="ts">
import {onMounted, ref} from "vue";
import BlacklistService from "@/service/BlacklistService";
import {Action, ElMessage, ElMessageBox} from "element-plus";

const whitelistData = ref<ApkWhitelist[]>([])
const currentData = ref<ApkWhitelist>({
  id: 0,
  packageName: "",
  appName: "",
  md5: ""
})
const currentIndex = ref(0)
const dialogVisible = ref(false)
const addOrUpdate = ref<"添加" | "修改">("添加")

onMounted(() => {
  BlacklistService.findAll()
      .then(response => {
        whitelistData.value = response
      })
})

const handleWhitelistAdd = () => {
  dialogVisible.value = true
  addOrUpdate.value = "添加"
  currentData.value = {
    id: 0,
    packageName: "",
    appName: "",
    md5: ""
  }
}

const handleWhitelistEdit = (index: number, apkWhitelist: ApkWhitelist) => {
  dialogVisible.value = true
  addOrUpdate.value = "修改"
  currentData.value = apkWhitelist
  currentIndex.value = index
}

const handleWhitelistDelete = (index: number, apkWhitelist: ApkWhitelist) => {
  currentIndex.value = index
  ElMessageBox.alert(`确定删除本条白名单记录：${apkWhitelist.appName}`, '提示', {
    confirmButtonText: '确定',
    callback: (action: Action) => {
      if (action === 'confirm') {
        BlacklistService.deleteOne(apkWhitelist.id)
        whitelistData.value.splice(currentIndex.value, 1)
        ElMessage({
          type: 'warning',
          message: `${apkWhitelist.appName}记录删除成功`,
        })
      }
    },
  })
}

const handleAddOrUpdate = () => {
  if (addOrUpdate.value === "添加") {
    // TODO 这里需要得到后端返回的 id，并修改对应的 id，否则更新时会失败
    BlacklistService.add(currentData.value)
    whitelistData.value.push(currentData.value)
    ElMessage({
      type: 'success',
      message: `${currentData.value.appName}记录新增成功`,
    })
  } else if (addOrUpdate.value === "修改") {
    BlacklistService.update(currentData.value)
    whitelistData.value[currentIndex.value] = currentData.value
    ElMessage({
      type: 'success',
      message: `${currentData.value.appName}记录修改成功`,
    })
  } else {
    alert("无法识别的动作")
  }
  CloseDialog()
}

const CloseDialog = () => {
  dialogVisible.value = false
}
</script>

<template>
  <el-container class="blacklist-page-container">
    <div class="title-container">
      <h2 class="title-name">APK 白名单配置</h2>
      <el-button
          type="primary"
          icon="plus"
          @click="handleWhitelistAdd()"
          circle
      />
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
              type="primary"
              icon="edit"
              round
              @click="handleWhitelistEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              type="danger"
              icon="delete"
              round
              @click="handleWhitelistDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>

  <el-dialog
      :title="addOrUpdate"
      v-model="dialogVisible"
      style="border-radius: 8px"
      width="500"
  >
    <div class="form-container">
      <div class="form-item">
        <el-text
            class="form-item-label"
            size="large"
        >
          包名:
        </el-text>
        <el-input
            style="width: 65%; padding-left: 10px;"
            v-model="currentData.packageName"
        />
      </div>
      <div class="form-item">
        <el-text
            class="form-item-label"
            size="large"
        >
          应用名:
        </el-text>
        <el-input
            style="width: 65%; padding-left: 10px;"
            v-model="currentData.appName"
        />
      </div>
      <div class="form-item">
        <el-text
            class="form-item-label"
            size="large"
        >
          md5摘要:
        </el-text>
        <el-input
            style="width: 65%; padding-left: 10px;"
            v-model="currentData.md5"
        />
      </div>
    </div>
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.title-name {
  font-weight: bold;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-item {
  display: flex;
  flex-direction: row;
  padding: 5px;
}

.form-item-label {
  width: 100px;
}
</style>
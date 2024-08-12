<script setup lang="ts">
import {ref, watch} from "vue";
import FilterService from "@/service/FilterService";
import {Action, ElMessage, ElMessageBox} from "element-plus";

const props = defineProps<{
  forceShow: boolean;
}>();

const dialogVisible = ref(false)  // 控制本组件的显示与否
const urlFilterData = ref<Filter[]>([])
const sdkFilterData = ref<Filter[]>([])

const modifyDialogVisible = ref(false)  // 控制配置组件的显示与否
const addOrUpdate = ref<"添加" | "修改">("添加")
const urlOrSdk = ref<"url" | "sdk">("url")
const currentData = ref<Filter>({
  id: 0,
  rule: ""
})
const currentIndex = ref(0)

watch(props, () => {
  dialogVisible.value = true
  // 加载 Filter 数据
  FilterService.findAll("url")
      .then((res) => {
        urlFilterData.value = res
      })
  FilterService.findAll("sdk")
      .then((res) => {
        sdkFilterData.value = res
      })
})

const handleFilterAdd = (type: "url" | "sdk") => {
  modifyDialogVisible.value = true
  addOrUpdate.value = "添加"
  urlOrSdk.value = type
  currentData.value = {
    id: 0,
    rule: ""
  }
}

const handleFilterEdit = (type: "url" | "sdk", index: number, row: Filter) => {
  modifyDialogVisible.value = true
  addOrUpdate.value = "修改"
  urlOrSdk.value = type
  currentData.value = row
  currentIndex.value = index
}

const handleFilterDelete = (type: "url" | "sdk", index: number, row: Filter) => {
  currentIndex.value = index
  ElMessageBox.alert(`确定删除本条记录：${row.rule}`, '提示', {
    confirmButtonText: '确定',
    callback: (action: Action) => {
      if (action === 'confirm') {
        FilterService.deleteOne(row.id, type)
        if (type === "url") {
          urlFilterData.value.splice(currentIndex.value, 1)
        } else if (type === "sdk") {
          sdkFilterData.value.splice(currentIndex.value, 1)
        }
        ElMessage({
          type: 'warning',
          message: `${row.rule}记录删除成功`,
        })
      }
    },
  })
}

const handleAddOrUpdate = () => {
  if (addOrUpdate.value === "添加") {
    FilterService.add(currentData.value, urlOrSdk.value)
    if (urlOrSdk.value === "url") {
      urlFilterData.value.push(currentData.value)
    } else if (urlOrSdk.value === "sdk") {
      sdkFilterData.value.push(currentData.value)
    }
    ElMessage({
      type: 'success',
      message: `${currentData.value.rule} 新增成功`,
    })
  } else if (addOrUpdate.value === "修改") {
    FilterService.update(currentData.value, urlOrSdk.value)
    if (urlOrSdk.value === "url") {
      urlFilterData.value[currentIndex.value] = currentData.value
    } else if (urlOrSdk.value === "sdk") {
      sdkFilterData.value[currentIndex.value] = currentData.value
    }
    ElMessage({
      type: 'success',
      message: `${currentData.value.rule} 修改成功`,
    })
  } else {
    alert("无法识别的动作")
  }
  CloseModifyDialog()
}

const CloseModifyDialog = () => {
  modifyDialogVisible.value = false
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="过滤器配置"
    style="border-radius: 8px; width: 70%; height: 60%"
  >
    <el-container class="container">
      <el-aside class="aside">
        <div class="title">
          <strong>URL 过滤器</strong>
          <el-button
              type="primary"
              icon="plus"
              size="small"
              @click="handleFilterAdd('url')"
              circle
          />
        </div>
        <el-table
            :data="urlFilterData"
            border stripe
            align="center"
            height="100%"
        >
          <el-table-column
              prop="rule"
              label="规则"
              >
          </el-table-column>

          <el-table-column
              fixed="right"
              label="操作"
              >
            <template #default="scope">
              <el-button
                  type="primary"
                  icon="edit"
                  round
                  @click="handleFilterEdit('url', scope.$index, scope.row)">编辑</el-button>
              <el-button
                  type="danger"
                  icon="delete"
                  round
                  @click="handleFilterDelete('url', scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>

      <el-aside class="aside">
        <div class="title">
          <strong>SDK 过滤器</strong>
          <el-button
              type="primary"
              icon="plus"
              size="small"
              @click="handleFilterAdd('sdk')"
              circle
          />
        </div>
        <el-table
            :data="sdkFilterData"
            border stripe
            align="center"
            height="100%"
        >
          <el-table-column
              prop="rule"
              label="规则"
              >
          </el-table-column>

          <el-table-column
              fixed="right"
              label="操作"
              >
            <template #default="scope">
              <el-button
                  type="primary"
                  icon="edit"
                  round
                  @click="handleFilterEdit('sdk', scope.$index, scope.row)">编辑</el-button>
              <el-button
                  type="danger"
                  icon="delete"
                  round
                  @click="handleFilterDelete('sdk', scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
    </el-container>

    <el-dialog
        :title="addOrUpdate + ' ' + urlOrSdk + ' ' + '过滤规则'"
        v-model="modifyDialogVisible"
        style="border-radius: 8px"
        width="500"
    >
      <div class="form-container">
        <div class="form-item">
          <el-text
              class="form-item-label"
              size="large"
          >
            规则:
          </el-text>
          <el-input
              style="width: 65%; padding-left: 10px;"
              v-model="currentData.rule"
          />
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="CloseModifyDialog">关闭</el-button>
          <el-button type="primary" color="#725feb" @click="handleAddOrUpdate">
            {{ addOrUpdate }}
          </el-button>
        </div>
      </template>
    </el-dialog>

  </el-dialog>
</template>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: row;
}

.aside {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 6px 0 6px;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 8px;
}
</style>
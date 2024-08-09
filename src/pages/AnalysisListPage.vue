<script setup lang="ts">
import {onMounted, ref} from 'vue'
import AnalysisService from '@/service/AnalysisService'
import Report from "@/pages/ReportPage.vue";

interface BlackListData {
  id: number;
  apkName: string;
  packageName: string;
  staticStatus: string;
  dynamicStatus: string;
  judgeStatus: string;
  judgeResult: string;
  isGamble: boolean;
  gambleReason: string;
  isSex: boolean;
  sexReason: string;
  isScam: boolean;
  scamReason: string;
  createTime: string;
  analysisNo: string;
  type: string;
}

const analysisNum = ref<string>('')
const forceShowReport = ref<boolean>(false)  // 用于强制显示 Report
const blackList = ref<BlackListData[]>([])
const whiteList = ref<BlackListData[]>([])

onMounted(() => {
  AnalysisService.getBlacklist()
      .then(response => {
        const allOrders: BlackListData[] = response.message
        whiteList.value = allOrders.filter((order) => {
          return !order.isScam && !order.isSex && !order.isGamble;
        })
        blackList.value = allOrders.filter((order) => {
          return !(!order.isScam && !order.isSex && !order.isGamble);
        })
        blackList.value = blackList.value.map((order) => {
          order.type = ""
          if (order.isSex) order.type += "涉黄 "
          if (order.isScam) order.type += "涉诈 "
          if (order.isGamble) order.type += "涉赌 "
          return order
        })
      })
      .catch(error => {
        console.error('黑白名单获取失败:', error);
      });
})

const showReport = (analysisNo: string) => {
  analysisNum.value = analysisNo
  forceShowReport.value = !forceShowReport.value
}

const getHeaderRowClass = () => {
  return "header-row"
}
</script>

<script lang="ts">
export default {
  name: "BlackListPage"
}
</script>

<template>
  <el-container class="Container">
    <el-aside class="Side">
      <div class="Title">
        <strong>App黑名单</strong>
      </div>
      <div class="Table">
        <el-table
            :data="blackList"
            stripe border
            height="100%"
            style="width: 98%"
            :header-row-class-name="getHeaderRowClass"
        >
          <el-table-column prop="apkName" label="文件名" width="250" />
          <el-table-column prop="createTime" label="检定时间" width="180" />
          <el-table-column prop="type" label="类别" />
          <el-table-column fixed="right" label="操作" min-width="50">
            <template #default="scope">
              <el-button
                  type="primary" size="large" link
                  icon="zoom-in"
                  @click.prevent="showReport(scope.row.analysisNo)"
              >
                详细信息
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-aside>

    <el-aside class="Side">
      <div class="Title">
        <strong>App白名单</strong>
      </div>
      <div class="Table">
        <el-table
            :data="whiteList"
            stripe border
            height="100%"
            style="width: 98%"
            :header-row-class-name="getHeaderRowClass"
        >
          <el-table-column prop="apkName" label="文件名" width="320" />
          <el-table-column prop="createTime" label="检定时间" width="180" />
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button
                  type="primary" size="large" link
                  icon="zoom-in"
                  @click.prevent="showReport(scope.row.analysisNo)"
              >
                详细信息
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-aside>
  </el-container>

  <Report :analysis-no="analysisNum" :force-show="forceShowReport"/>
</template>

<style scoped>
.Container {
  height: 100%;
  display: flex;
  flex-direction: row;
}

.Side{
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.Title{
  text-align: center;
  height: 7%;
}

.Table{
  width: 100%;
  height: 93%;
  display: flex;
  justify-content: center;
}


.header-cell {
  color: black;
  font-size: 20px;
}
</style>

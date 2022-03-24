<template>
  <el-dialog title="选择指标512312" :visible.sync="dialogVisible" :before-close="handleClose" width="60%" :close-on-click-modal="false">
    <div v-loading="loading">
      <el-steps :active="active" align-center finish-status="success" process-status="finish">
        <el-step v-for="item in stepList" :key="item" :title="item"></el-step>
      </el-steps>
      <!-- <EsignBizSteps :stepList="stepList" :active="active" :space="space" /> -->
      <div v-if="active === 0">
        <el-form inline class="form">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="搜索" style="width: 100%">
                <el-input v-model="name" debounce @change="getList" style="width: 100%">
                  <i @click="getList" slot="suffix" class="el-icon-search searchicon"></i
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="统计维度" style="width: 100%">
                <el-select v-model="dimensionIds" multiple filterable clearable>
                  <el-option v-for="item in dimensionList" :label="item.name" :value="item.id" :key="item.id"> </el-option> </el-select
              ></el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="tableReturn.list">
          <el-table-column label="指标名称" prop="name"></el-table-column>
          <el-table-column label="统计维度" prop="dimensionNames"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleChoice(scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="foot-container">
          <el-pagination
            class="foot"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageValue.pageSize"
            :current-page="pageValue.pageNum"
            @size-change="handleSizeChange"
            small
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next, sizes,jumper"
            :total="tableReturn.total"
          >
          </el-pagination>
        </div>
      </div>
      <div class="form" v-else>
        <span v-for="(item, index) in optionsList" :key="index">
          <el-select v-model="selectValue[item.id].value" :disabled="selectValue[item.id].isReadOnly">
            <el-option v-for="option in item.option" :key="option" :label="option" :value="option"> </el-option>
          </el-select>
          <span>-</span>
        </span>

        <span>{{ clickItem.name }}</span>
        <div class="btn"><el-button @click="prevStep">上一步</el-button><el-button type="primary" @click="onSubmit">确定</el-button></div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'EsignBizIndicatorV3',
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    tableReturn: {
      type: Object,
      required: true,
    },
    dimensionList: {
      type: Array,
      required: true,
    },
    optionsList: {
      type: Array,
      required: true,
    },
    defaultValues: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const active = ref(0)
    const stepList = ref(['挑选指标', '选择维度'])
    const pageValue = ref({
      pageSize: 10,
      pageNum: 1,
    })
    const clickItem = ref({})
    const dimensionIds = ref([])
    const name = ref('')
    const selectValue = ref({})
    watch(
      pageValue,
      () => {
        getList()
      },
      { deep: true }
    )
    watch(
      () => props.dialogVisible,
      (value) => {
        if (value) {
          emit('get-dimension')
          pageValue.value = {
            pageSize: 10,
            pageNum: 1,
          }
        }
      }
    )
    watch(dimensionIds, () => {
      if (props.dialogVisible) {
        getList()
      }
    })
    watch(
      () => props.optionsList,
      (value) => {
        const obj = {}
        for (const item of value) {
          obj[item.id] = props.defaultValues[item.key] ? props.defaultValues[item.key] : { value: '', isReadonly: false }
        }
        selectValue.value = obj
        if (props.dialogVisible) {
          active.value++
        }
      }
    )
    function init() {
      clickItem.value = {}
      dimensionIds.value = []
      selectValue.value = {}
      active.value = 0
    }
    function handleClose() {
      emit('handleClose')
      init()
    }
    function handleCurrentChange(current) {
      pageValue.value.pageNum = current
    }
    function handleSizeChange(pageSize) {
      pageValue.value.pageSize = pageSize
    }
    function handleChoice(item) {
      clickItem.value = item
      emit('getSelectList', item.dimensionIds)
    }
    function getList() {
      emit('get-table', {
        dimensionIds: dimensionIds.value,
        limit: pageValue.pageSize,
        name: name.value,
        offset: (pageValue.pageNum - 1) * pageValue.pageSize,
      })
    }
    function prevStep() {
      init()
    }
    function onSubmit() {
      const dimensionChooses = []
      const showName = []
      for (const key in selectValue.value) {
        const element = selectValue[key]
        dimensionChooses.push({ dimensionId: key, value: element.value })
        showName.push(element.value)
      }
      showName.push(clickItem.value.name)
      emit('getResult', {
        businessIndicatorId: clickItem.value.id,
        dimensionChooses,
        showName: showName.join('_'),
      })
      handleClose()
    }

    return {
      active,
      stepList,
      pageValue,
      clickItem,
      dimensionIds,
      name,
      selectValue,
      init,
      handleClose,
      handleCurrentChange,
      handleSizeChange,
      handleChoice,
      getList,
      prevStep,
      onSubmit,
    }
  },
  emits: ['handleClose', 'get-table', 'get-dimension', 'getResult', 'getSelectList'],
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__header {
  border-bottom: 1px solid #d6d6d6;
  .el-dialog__title {
    font-size: 16px;
  }
}
.form {
  text-align: center;
  padding-top: 20px;
}
.foot-container {
  width: 100%;
  height: 50px;
  position: relative;
  bottom: 0;
  right: 0;
  .foot {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
.searchicon {
  cursor: pointer;
  width: 20px;
  height: 20px;
}
.btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
</style>

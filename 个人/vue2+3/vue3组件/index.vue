<template>
  <div>
    <Indicator
      :tableReturn="tableResult"
      :dimensionList="dimensionList"
      @get-table="getTable"
      @get-dimension="getDimension"
      :dialogVisible="dialogVisible"
      @handleClose="handleClose"
      @getResult="getResult"
      @getSelectList="getSelectList"
      :optionsList="optionsList"
      :loading="loading"
      :defaultValues="defaultValues"
    />
  </div>
</template>
<script>
import Indicator from './components/Indicator.vue'
import axios from './service'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
export default {
  name: 'EsignBizIndicatorV3',
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    defaultValues: {
      type: Object,
      default: () => ({}),
    },
  },
  components: { Indicator },
  emits: ['closed', 'takeResult'],
  setup(props, { emit }) {
    const tableResult = ref({ total: 0, list: [] })
    const dimensionList = ref([])
    const optionsList = ref([])
    const loading = ref(false)
    function handleClose() {
      optionsList.value = []
      dimensionList.value = []
      tableResult.value = { total: 0, list: [] }
      emit('closed')
    }
    function getTable(params) {
      loading.value = true
      axios
        .post('/business_indicator/common/list', params)
        .then((res) => {
          tableResult.value = res.data.data
        })
        .finally(() => {
          loading.value = false
        })
    }
    function getDimension() {
      loading.value = true
      axios
        .get('/dimension/list')
        .then((res) => {
          dimensionList.value = res.data.data
        })
        .finally(() => {
          loading.value = false
        })
    }
    async function getSelectList(dimensionIds) {
      loading.value = true
      const optionsList = []
      try {
        for (let i = 0; i < dimensionIds.length; i++) {
          const res = await axios.post('/dimension/preview', { dimensionId: dimensionIds[i] })
          let firstkey = ''
          for (const key in res.data.data[0]) {
            if (!firstkey) {
              firstkey = key
            }
            break
          }
          const option = res.data.data.map((item) => item[firstkey])
          optionsList.value.push({ id: dimensionIds[i], option, key: firstkey })
        }
        optionsList.value = optionsList
        loading.value = false
      } catch (error) {
        ElMessage.error(error)
        loading.value = false
      }
    }
    function getResult(params) {
      loading.value = true
      axios
        .post('/business_indicator/common/detail', params)
        .then((res) => {
          emit('takeResult', res.data.data)
          handleClose()
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      tableResult,
      dimensionList,
      optionsList,
      loading,
      handleClose,
      getTable,
      getDimension,
      getSelectList,
      getResult,
    }
  },
}
</script>

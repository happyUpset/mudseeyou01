import { defineStore } from 'pinia'

export const storeRecords = defineStore('records', ()=> {
  const list = ref([]) //orderList
  const response = ref({data: []}) //orderData
  const listCounts = ref(null) //orderListCounts

  async function set_user_order_list(orderList = {data: null,counts: null}) {
    if (orderList !== null) {
      await set_order_list(orderList)
    }
  }
  function clear_user_order_list() {
    set_order_list({data: null,counts:null})
  }

  function set_order_list(orderList) {
     list.value = orderList.data;
     response.value = orderList;
     listCounts.value = orderList.counts;
  }

  function add_user_order_list(bingoBetConfirmList) {
    list.value.push(bingoBetConfirmList)
    if(response.value.data)
      response.value.data.push(bingoBetConfirmList)
  }
  return{
    list,
    response,
    listCounts,
    set_user_order_list,
    clear_user_order_list,
    add_user_order_list
  }
})

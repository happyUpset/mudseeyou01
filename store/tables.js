import { defineStore } from 'pinia'

export const storeTables = defineStore('tables', ()=>{

  const tables = ref([])


  function set_tables(tableData) {
    tables.value = tableData
  }

  return{
    tables,
    set_tables,
  }
})

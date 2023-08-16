import { defineStore } from 'pinia'

export const storeOffers = defineStore('offers', ()=>{

  const pickPlan = ref({})

  function set_plan(value){
    pickPlan.value = value;
  }

  return {
    pickPlan,
    set_plan,
  }
})

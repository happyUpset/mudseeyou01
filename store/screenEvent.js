import { defineStore } from 'pinia'

export const screenEvent = defineStore('screenEvent', {
  state: () => {
    return {
      isSideBar: false,
      isMask: false,

    }
  },

  actions: {
    set_sideBar(boolean) {
      this.$patch((state) => {
        state.isSideBar = boolean
      })
    },
  },
  getters: {
    hasPermissions: (state) => state.permissions?.length > 0,
  }
})

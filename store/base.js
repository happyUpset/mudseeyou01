import { defineStore } from 'pinia'

export const storeBase = defineStore('base', {
  state: () => {
    return {
      permissions: [],
      isPermissionsGetting: false,
      timer: 0,
      modes:{
        favorite: false
      },
      apiUrl: ''
    }
  },

  actions: {
    set_mode_state({name,value}) {
      this.$patch((state) => {
        if(typeof state.modes[name] !== 'undefined'){
          state.modes[name] = value
        }
      })
    },
    set_api_url(url) {
      this.$patch((state) => {
        state.apiUrl = url
      })
    },
    set_permissions(permissions) {
      this.$patch((state) => {
        state.permissions = permissions
      })
    },
    add_timer() {
      this.$patch((state) => {
        state.timer++
      })
    },
  },
  getters: {
    hasPermissions: (state) => state.permissions?.length > 0,
    isFavorite: (state) => state.modes.favorite,
  }
})

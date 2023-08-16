import { defineStore } from 'pinia'
import {computed} from "vue";
import { DateTime } from "luxon";

export const storeAuth = defineStore('auth', ()=>{

  const tempPhone = ref('')
  const profile = ref(null)
  const isReady = ref(false)
  const birthdayAns = ref(false)
  const permissions = ref([])

  const token = ref(null)
  const grantType = ref('password')

  function setProfile(profileData) {
    profile.value = profileData;
  }
  function setProfileForm({text,value}) {
    profile.value[text] = value;
  }
  function setProfilePlanUsing(boolean) {
    if(profile.value?.plan ?? false){
      profile.value.plan.has_booking = boolean
    }
  }

  /**
   * 是否完成登入流程
   * @param boolean
   */
  function setAuthIsReady(boolean) {
    isReady.value = boolean;
  }
  function removeProfile() {
    profile.value = null;
  }
  function logout(){
    console.log('logout')
    removeProfile()
    setToken(null)
  }
  function set_permissions(permissionsList) {
    permissions.value = permissionsList
  }
  function setToken(tokenData) {
    if(typeof tokenData === 'undefined'){
      const authToken = useCookie("table_tennis_platform_tk");
      token.value = authToken.value
    }else {
      const authToken = useCookie("table_tennis_platform_tk");
      authToken.value = tokenData
      token.value = tokenData
    }
  }
  function setBirthdayAns(boolean){
    birthdayAns.value = boolean
  }
  function setTempPhone(phone){
    tempPhone.value = phone
  }

  const hasPermissions = computed(() => permissions.value?.length > 0 ?? false)

  // 登入判斷 null 等待 true 登入 false 未登入
  const loginCheck = computed(() => {
    if (isReady.value) {
      return !!profile.value
    } else {
      return null
    }
  })

  const isRegistered = computed(() => {
    return profile.value.name !== null
      && profile.value.birthday !== null
      && profile.value.email !== null
  })

  const hasOffers = computed(() => {
    if(profile?.value?.plan?.start_at){
      let start = DateTime.fromISO(profile.value.plan.start_at).toMillis()
      let end = DateTime.fromISO(profile.value.plan.end_at).toMillis()
      let now = DateTime.now().toMillis()
      return start < now && end > now
    }
    return false
  })

  const hasUsingOffersNow = computed(() => {
    return hasOffers.value && profile.value.plan.has_booking
  })

  return {
    tempPhone,
    profile,
    isReady,
    permissions,
    token,
    birthdayAns,
    setTempPhone,
    setProfile,
    setProfileForm,
    setProfilePlanUsing,
    setAuthIsReady,
    removeProfile,
    set_permissions,
    setBirthdayAns,
    setToken,
    hasPermissions,
    loginCheck,
    logout,
    isRegistered,
    hasOffers,
    hasUsingOffersNow
  }
})

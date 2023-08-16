import {GET_PROFILE, GET_TOKEN} from "~/api/auth";
import {URL} from "~/const/routerName";

export const initPhone = (handleScrollFunc: any) => {
  const state = reactive({
    resizeSto: null,
    resizeStoTime: 0,
    detectResize: true,
  })
  const isPhoneLoading = ref(false)
  const phone = ref('')
  const authToken = useCookie("table_tennis_platform_tk")
  const { delay,setUseSTO,setDelayLength } = useDelay()
  setUseSTO(true)
  setDelayLength(state.resizeStoTime)

  const readyWindow = () => {
    if (state.detectResize) {
      window.addEventListener('resize', handleResizeSto)
    }
  }
  const beforeDestroyWindow = () => {
    if (state.detectResize) {
      window.removeEventListener('resize', handleResizeSto)
    }
  }
  const handleResizeSto = () => {
    delay(()=>{
      handleResize()
    })
  }
  let handleResize = () => {
    handleScrollFunc()
  }

  async function getToken() {
    isPhoneLoading.value = true
    let returnData = await GET_TOKEN(phone.value)

    if (returnData.status !== 200 ) {
      // 沒有登入過，此時需需要拿此手機號碼輸入驗證碼，得以建檔
      // await GET_TOKEN_CODE(phone.value) 取得驗證碼
    }else {
      // returnData.data === 'token data'
      // auth.setToken()
      // 不使用 auth.setToken() 讓 initAuth.ts 無法觸發抽取登入資訊，因我們在這裡已經會走該流程了
      authToken.value = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhkNzMyYjVlOGQ3NjQ0ZjkyY2UyYWRhZjQyMGZlOTRkYjc0M2VhMThhMmU2NmVlNzE2OTliOTQwMTBlZTQxYjJjMjE1MzdmNjEzMzY1OGYwIn0.eyJhdWQiOiIxMTU5IiwianRpIjoiOGQ3MzJiNWU4ZDc2NDRmOTJjZTJhZGFmNDIwZmU5NGRiNzQzZWExOGEyZTY2ZWU3MTY5OWI5NDAxMGVlNDFiMmMyMTUzN2Y2MTMzNjU4ZjAiLCJpYXQiOjE2NjczODMwMDgsIm5iZiI6MTY2NzM4MzAwOCwiZXhwIjoxNjk4OTE5MDA4LCJzdWIiOiIyMiIsInNjb3BlcyI6W119.O2UQJHnbo2p3HHlLNGNpWRBiLZ_wWhHYCxZLmoxvv7r4Zaz3bmQnGd4OcGHFn5R52mCmQrRER9XYtlkG-iSgSymyYh--6FfOUE7Ve4T_k5sdFVwykg_JFgPIWO2xkY4fMDkFUw3gvzivJCX2amucSp41emc20k7ena23T1lZ1sVhOriVohZwMzBQLmzUO0a-YaSg3MgBH3qbR9OANxZ0AgbTIbJr-L4RdVm_3TGEIz2XKP4FlBn7uN1FrkNr_pW6X2nX57yaprgz8mpOTy3rCF9-vszmvW6xtmgJvmBMweZgbx5dgmJMIvAEB8aGyLUL-Fu9DRtgPk4PYVFXH4gEe9RKhkkYv_smplqOzP1UkiiNvF0R-S4EeNFapmt6JiOafaT1_bW5dYVBT4Oke5DIcCotl9aWPpNjsnZuyMhG9OmW5iu1xAE5_HX_wp4Sve9N05D3fGbLhM2pYqiF32ATJugYlTgPOV1YneYzG8yQSvAEYcWF6tKeF6MH5RIhCO36fjig7ghFJrWsOUKzJUBDfvHhpZCeANX_vWGiokRBAYSwQl3JCN-tjmHRubYsGPJuplnXpibNPCGIMKiJYDGCmwFqeb8N3P6oJK4iZgEq7C4Sqsxz22B0ZS1c-BVFGYDdmZNyyXi73qA9kncmeKbDDS9yZJcSMBM4QXgZL9_9lxQ'
      await getUserProfiles(authToken.value)
    }
    // isPhoneLoading.value = returnData.pending.value
    // dataC.value = returnData.data.value
    // refreshC.value = returnData.refresh
  }
  async function getUserProfiles(token) {
    // @ts-ignore
    let returnData = await GET_PROFILE(token)
    await getUserProfile({
      data: {phone: '0987654321',name: null,verify: false }, // 首次會員純手機註冊
      // data: {phone: '0987654321',name: null,verify: true,' }, // 只是手機會員
      // data: {phone: '0987654321',name: '汪汪汪',verify: true }, // 註冊會員
      status: 200
    })
    if(returnData.error.value === null){
      await getUserProfile(returnData.data.value)
    }else {
      return ;
      auth.setToken(null)
      auth.removeProfile()
      auth.setAuthIsReady(true)
    }
  }

  async function getUserProfile(profile) {
    auth.setProfile(profile.data)
    if(!profile.data.verify){
      // 首次手機登入時，需驗證
      $router.replace({
        name: URL.verify.name,
        query: needRegister.value
          ? {redirectName: redirectName.value, rg: 1}
          : {redirectName: redirectName.value}
      })
    }else if(profile.data.name === null && needRegister.value){
      // 手機登入時，有註冊需求，且尚未註冊
      $router.replace({
        name: URL.register.name,
        query: {redirectName: redirectName.value}
      })
    }else {
      $router.replace({name: redirectName.value})
    }
    auth.setAuthIsReady(true)
  }

  onMounted(()=>{
    handleResize()
    readyWindow()
  })

  onUnmounted(()=>{
    beforeDestroyWindow()
  })

  return {
    handleResize,
    ...toRefs(state)
  }
}

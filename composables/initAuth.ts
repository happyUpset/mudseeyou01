import {GET_PROFILE} from "@/api/auth";
import {storeAuth} from "~/store/auth";

/**
 * 1. 判斷是否有 token
 * 2. 判斷是否能登入
 */
export const initAuth = () => {
  const authIsGetting = ref(false)
  const authRefresh = ref(null)
  const authError = ref(null)
  const auth = storeAuth()

  /**
   * 檢查登入情況
   */
  async function checkAuth() {
    await checkTokenValid()
  }

  /**
   * 檢查 token 有效？
   */
  async function checkTokenValid() {
    if(auth.token){
      await getUserProfiles()
    }else {
      auth.setAuthIsReady(true)
    }
  }

  /**
   * 代表 成功登入，會取得會員等級
   *  - 一般會員 只有 phone
   *  - 註冊會員 包含註冊資料 －> 內有方案時間資訊
   *
   */
  async function getUserProfiles() {
    // @ts-ignore
    let returnData = await GET_PROFILE()
    if(returnData.error.value === null){
      await getUserProfile(returnData.data.value)
    }else {
      auth.setToken(null)
      auth.removeProfile()
      auth.setAuthIsReady(true)
    }
    authIsGetting.value = returnData.pending.value
    authRefresh.value = returnData.refresh.value
    authError.value = returnData.error.value
  }

  /**
   * 匯入會員資訊
   * @param profile
   */
  async function getUserProfile(profile: {data: {},status: number}) {
    auth.setProfile(profile.data)
    auth.setAuthIsReady(true)
  }

  watch(() => auth.token, async (new1) => {
    if (process.client && new1) {
      await checkTokenValid()
    }
  })

  onMounted(async () => {
    auth.setToken()
    await checkAuth()
  })
}

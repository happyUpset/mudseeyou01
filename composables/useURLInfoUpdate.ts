import {useDelay} from "~/composables/useDelay";

export const useURLInfoUpdate = (
  {
    popstateBeforeWork = (e: Function) => {
    },
    popstateAfterWork = (e: Function) => {
    }
  } = {}) => {

  // data
  const {setDelayLength, delay} = useDelay()
  const $router = useRouter()
  const $route = useRoute()

  const urlQuery = ref({})

  // 如果URL是空值則套用此
  const defaultUrlQuery = ref({})

  // 是否以網址的 Query 為主？
  const isUpdateWithUrl = ref(true)

  // 確認本次更新有在監聽範圍內，不需要由watch出手
  const isQueryUpdating = ref(false)

  // 網址更新次數
  const queryChangeCounts = ref(0)

  // methods
  const setDefaultQuery = (queryData: object) => {
    urlQuery.value = JSON.parse(JSON.stringify(queryData))
    defaultUrlQuery.value = JSON.parse(JSON.stringify(queryData))
    // console.log(query.value)
  }
  const updateQuery = (
    {
      queries = urlQuery.value,
      params = null,
      updateCounts = true,
      hash = '#c', // #stay
      routeType = 'push',
      callback = (e: any) => {
      },
      callbackDelay = 0
    } = {
      queries: urlQuery.value,
      params: null,
      updateCounts: true,
      hash: '#c', // #stay
      routeType: 'push',
      callback: () => {
      },
      callbackDelay: 0
    }
  ) => {
    if (callbackDelay > 0)
      setDelayLength(callbackDelay)
    delay(() => {
      // console.log('changeData2')
      isQueryUpdating.value = true
      urlQuery.value = injectQuery(queries)
      const queryTemp = combineQuery(urlQuery.value)
      updateState(queryTemp, params, routeType, hash)
      if (updateCounts) {
        queryChangeCounts.value++
      }
      callback(queryTemp)
    })
  }
  const popstateBefore = (res: any) => {
    if (popstateBeforeWork)
      popstateBeforeWork(res)
  }
  const popstateAfter = (res: any) => {
    if (popstateAfterWork)
      popstateAfterWork(res)
  }

  function injectQuery(queries: any) {
    return Object.assign({}, queries, makeNameListWithAct(queries, $route.query, isUpdateWithUrl.value))
  }

  // 過濾不適用的query(通用)
  function combineQuery(queries: any) {
    const queryObj = {}
    for (const queryName of Object.keys(queries)) {
      if (queries[queryName] !== '' && queries[queryName] !== null) {
        queryObj[queryName] = queries[queryName]
      }
    }
    return queryObj
  }

  // 建立排序啟用狀態 first => 網址優先覆蓋送出資料
  function makeNameListWithAct(queries: any, currentQueryList : any, useURL = false) {
    const queryList: any = {}
    if (typeof queries === 'object') {
      for (const name of Object.keys(query.value)) {
        if (!(typeof currentQueryList[name] === 'undefined' ||
          currentQueryList[name] === null ||
          currentQueryList[name] === '')) {
          queryList[name] = useURL ? currentQueryList[name] : queries[name]
        }
      }
    }
    // console.log('queryList', queryList)
    return queryList
  }

  function updateState(query: any, replaceParams: any, routeType: string, hash: string) {
    console.log('updateState 1', query)
    if (ifInjectQueryToHtml()) {
      console.log('updateState', query)
      if (replaceParams) {
        const params = Object.assign({}, $route.params)
        Object.keys(replaceParams).forEach((replaceParamsName) => {
          if (({}).hasOwnProperty.call(params, replaceParamsName)) {
            params[replaceParamsName] = replaceParams[replaceParamsName]
          }
        })
        // $router[routeType]({params, query, hash: '#c'}).catch(err => err);
        $router[routeType]({params, query, hash})
      } else {
        // $router[routeType]({query, hash: '#c'}).catch(err => err);
        $router[routeType]({query, hash})
      }
    }
  }

  // 載入是否該注入route.query
  function ifInjectQueryToHtml() {
    console.log(isUpdateWithUrl.value, Object.keys($route.query))
    return Object.keys($route.query).length > 0 || !isUpdateWithUrl.value
  }

  watch(() => $route.query, (new1, old1) => {
    if (isQueryUpdating.value) {
      isQueryUpdating.value = false
    } else {
      isUpdateWithUrl.value = true
      popstateBefore(new1)
      updateQuery({
        queries: defaultUrlQuery.value,
        callback: () => {
          isUpdateWithUrl.value = false
          isQueryUpdating.value = false
          popstateAfter(new1)
        }
      })
    }
  })

  // function popstate() {
  //   // 已交由watch控制
  // }
  //
  // onMounted(() => {
  //   window.addEventListener('popstate', popstate)
  // })
  // onUnmounted(() => {
  //   window.removeEventListener('popstate', popstate)
  // })

  onBeforeMount(() => {
    defaultUrlQuery.value = JSON.parse(JSON.stringify(urlQuery.value))
  })

  return {
    urlQuery,
    isUpdateWithUrl,
    queryChangeCounts,
    setDefaultQuery,
    updateQuery
  }
}

import {useDelay} from "~/composables/useDelay";

export const useQuerySimple = ({popstateBeforeWork = (e)=>{}, popstateAfterWork = (e)=>{}} = {}) => {

  // data
  const {setDelayLength, delay} = useDelay()
  const $router = useRouter()
  const $route = useRoute()

  const query = ref({})
  // 如果URL是空值則套用此
  const defaultQuery = ref({})
  // 是否已網址的 Query 為主？
  const queryUseURL = ref(true)
  // 確認本次更新有在監聽範圍內，不需要由watch出手
  const queryUpdate = ref(false)
  const queryChangeCounts = ref(0)

  // methods
  const setDefaultQuery = (queryData) => {
    query.value = JSON.parse(JSON.stringify(queryData))
    defaultQuery.value = JSON.parse(JSON.stringify(queryData))
    console.log(query.value)
  }
  const updateQuery = ({
   queries = query.value,
   addParams = null,
   setOnState = true,
   hash = '#c', // #stay
   routeType = 'push',
   callback = (e) => {},
   callbackDelay = null} = {
    queries:query.value,
    addParams: null,
    setOnState: true,
    hash: '#c', // #stay
    routeType: 'push',
    callback: () => {},
    callbackDelay: null}
  ) => {
    if(callbackDelay)
      setDelayLength(callbackDelay)
    delay(() => {
      console.log('changeData2')
      queryUpdate.value = true
      query.value = injectQuery(queries)
      const queryTemp = combineQuery(query.value)
      updateState(queryTemp, addParams, routeType, hash)
      if (setOnState) {
        queryChangeCounts.value++
      }
      callback(queryTemp)
    })
  }
  const popstateBefore = (res) => {
    if(popstateBeforeWork)
      popstateBeforeWork(res)
  }
  const popstateAfter = (res) => {
    if(popstateAfterWork)
      popstateAfterWork(res)
  }

  function injectQuery(queries) {
    return Object.assign({}, queries, makeNameListWithAct(queries, $route.query, queryUseURL.value))
  }
  // 過濾不適用的query(通用)
  function combineQuery(queries) {
    const queryObj = {}
    for (const queryName of Object.keys(queries)) {
      if (queries[queryName] !== '' && queries[queryName] !== null) {
        queryObj[queryName] = queries[queryName]
      }
    }
    return queryObj
  }
  // 建立排序啟用狀態 first => 網址優先覆蓋送出資料
  function makeNameListWithAct(queries, currentQueryList, useURL = false) {
    const queryList = {}
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
  function updateState(query, addParams, routeType, hash) {
    console.log('updateState 1',query)
    if (ifInjectQueryToHtml()) {
      console.log('updateState',query)
      if (addParams) {
        const params = Object.assign({}, $route.params)
        Object.keys(addParams).forEach((addParamName) => {
          if (({}).hasOwnProperty.call(params, addParamName)) {
            params[addParamName] = addParams[addParamName]
          }
        })
        // $router[routeType]({params, query, hash: '#c'}).catch(err => err);
        $router[routeType]({ params, query, hash })
      } else {
        // $router[routeType]({query, hash: '#c'}).catch(err => err);
        $router[routeType]({ query, hash })
      }
    }
  }
  // 載入是否該注入route.query
  function ifInjectQueryToHtml() {
    console.log(queryUseURL.value,Object.keys($route.query))
    return Object.keys($route.query).length > 0 || !queryUseURL.value
  }

  onBeforeMount(()=>{
    defaultQuery.value = JSON.parse(JSON.stringify(query.value))
  })

  return {
    query,
    queryUseURL,
    queryChangeCounts,
    setDefaultQuery,
    updateQuery
  }
}

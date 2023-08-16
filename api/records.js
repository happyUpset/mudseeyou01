import {APP_API} from "~/const/base";

export const GET_RECORDS = async () => {
  const authToken = useCookie("table_tennis_platform_tk");
  const {data, pending, error, refresh} = await useFetch(
    APP_API+'/api/payments',
    {
      key: 'records',
      headers: authToken.value ? {Authorization: 'Bearer '+authToken.value} : {},
    })
  return {data, pending, error, refresh}
}

export const GET_RECORDS_NO = async (payment_no) => {
  const authToken = useCookie("table_tennis_platform_tk");
  const {data, pending, error, refresh} = await useFetch(
    APP_API+`/api/payments/${payment_no}`,
    {
      key: 'recordsItem',
      headers: authToken.value ? {Authorization: 'Bearer '+authToken.value} : {},
    })
  return {data, pending, error, refresh}
}


export const POST_CANCEL_RECORDS_NO = async (payment_no) => {
  const authToken = useCookie("table_tennis_platform_tk");
  const {data, pending, error, refresh} = await useFetch(
    APP_API+`/api/payments/${payment_no}/cancel`,
    {
      key: 'recordsItemCancel',
      method: 'post',
      headers: authToken.value ? {Authorization: 'Bearer '+authToken.value} : {},
    })
  return {data, pending, error, refresh}
}

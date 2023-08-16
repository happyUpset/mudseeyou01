import {APP_API} from "~/const/base";

export const GET_TABLES = async (date) => {
  const {data, pending, error, refresh} = await useFetch(
    APP_API+'/api/sections',
    {
      key: 'tables',
      params: {
        date
      }
    })
  return {data, pending, error, refresh}
}

export const GET_SECTION_INTERNAL = async () => {
  const authToken = useCookie("table_tennis_platform_tk");
  const {data, pending, error, refresh} = await useFetch(
    APP_API+'/api/sections/internal',
    {
      key: 'internal',
      headers: authToken.value ? {Authorization: 'Bearer '+authToken.value} : {},
    })
  return {data, pending, error, refresh}
}

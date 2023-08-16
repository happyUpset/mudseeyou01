import {APP_API} from "~/const/base";

export const GET_OFFERS = async () => {
  const {data, pending, error, refresh} = await useFetch(
    APP_API+'/api/plans',
    {
      key: 'offers',
    })
  return {data, pending, error, refresh}
}

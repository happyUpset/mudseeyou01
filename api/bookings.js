import {APP_API} from "~/const/base";

export const POST_BOOKINGS = async ({phone_number,purchase_from,quantity,section_id,booking_date,booking_period,customer_type = 'general',payment_gateway = 'linepay',prime}) => {
  let body = {
    phone_number,
    payment_type: 'booking',
    customer_type,
    section_id,
    payment_gateway,
    purchase_from,
    booking_date,
    booking_period,
    quantity,
  }

  if(prime){
    body.prime = prime
  }

  const {data, pending, error, refresh} = await useFetch(
    APP_API+'/api/booking',
    {
      key: 'booking',
      method: 'post',
      body
    })
  return {data, pending, error, refresh}
}

export const POST_BOOKINGS_PLAN = async ({phone_number,purchase_from,plan_id,payment_gateway = 'linepay'}) => {
  const {data, pending, error, refresh} = await useFetch(
    APP_API+'/api/booking',
    {
      key: 'bookingPlan',
      method: 'post',
      body:{
        phone_number,
        payment_type: 'plan',
        customer_type: 'general',
        payment_gateway,
        purchase_from,
        plan_id,
      }
    })
  return {data, pending, error, refresh}
}

import {GET_OFFERS} from "~/api/offers";
import {storeWeb} from "~/store/web";

export const needOffers = () => {

  // data
  const options = storeWeb()

  const { offers } = toRefs(options)

  const hasOffers = computed(()=>options.offers.length !== 0)

  async function updateOffers(){
    options.set_is_offers_getting(true)
    const {data, pending, error, refresh} = await GET_OFFERS()
    if (error.value === null) {
      options.set_offers(data.value.data)
    }
    options.set_is_offers_getting(false)
  }
  async function init(){
    if(!options.isOffersGetting && !hasOffers.value) {
      await updateOffers()
    }
  }

  onMounted(async ()=>{
    await init()
  })

  return {
    ntf: options,
    offers,
    hasOffers: hasOffers.value,
    updateOffers,
    init,
  }
}

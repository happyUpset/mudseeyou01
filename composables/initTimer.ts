import {storeBase} from "~/store/base";

export const initTime = () => {
  const sitv= ref(setInterval(()=>{}))
  const length = ref(1000)

  const base = storeBase()

  onMounted(()=>{
    sitv.value = setInterval(() => {
      base.add_timer();
    }, length.value);
  })

  onBeforeUnmount(()=>{
    clearInterval(sitv.value);
  })
}

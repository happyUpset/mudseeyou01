/**
 */
export const useClickable = () => {
    // data
    const click = ref(false)

    // methods
    const setClick = () => {
        const { delay } = useDelay()
        click.value = true;
        delay(()=>{
            click.value = false;
        })
    }
    const cReadyWindow = () => {
        document.addEventListener("click", setClick);
    }
    const cBeforeDestroyWindow = () => {
        document.removeEventListener("click", setClick);
    }

    return {
        click,
        cReadyWindow,
        cBeforeDestroyWindow
    }
}

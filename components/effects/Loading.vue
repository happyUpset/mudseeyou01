<template>
  <div class="flex justify-center items-center" v-if="active">
    <div class="sk-circle w-40 h-40 justify-center items-center relative" :class="color">
<!--      <div class="sk-child" v-for="child in 12" :class="['sk-circle'+child,useColor]"></div>-->
      <div
        class="sk-child w-40 h-40 absolute left-0 top-0 before:block before:mx-auto before:w-[15%] before:h-[15%] before:rounded-o before:animate-[sk-circleBounceDelay_1.2s_infinite_ease-in-out_both] sk-circle1"/>
      <div
        class="sk-child w-40 h-40 absolute left-0 top-0 before:block before:mx-auto before:w-[15%] before:h-[15%] before:rounded-o before:animate-[sk-circleBounceDelay_1.2s_infinite_ease-in-out_both] rotate-[30deg] sk-circle2"/>
      <div
        class="sk-child w-40 h-40 absolute left-0 top-0 before:block before:mx-auto before:w-[15%] before:h-[15%] before:rounded-o before:animate-[sk-circleBounceDelay_1.2s_infinite_ease-in-out_both] rotate-[60deg] sk-circle3"/>
      <div
        class="sk-child w-40 h-40 absolute left-0 top-0 before:block before:mx-auto before:w-[15%] before:h-[15%] before:rounded-o before:animate-[sk-circleBounceDelay_1.2s_infinite_ease-in-out_both] rotate-[90deg] sk-circle4"/>
      <div
        class="sk-child w-40 h-40 absolute left-0 top-0 before:block before:mx-auto before:w-[15%] before:h-[15%] before:rounded-o before:animate-[sk-circleBounceDelay_1.2s_infinite_ease-in-out_both] rotate-[120deg] sk-circle5"/>
      <div
        class="sk-child w-40 h-40 absolute left-0 top-0 before:block before:mx-auto before:w-[15%] before:h-[15%] before:rounded-o before:animate-[sk-circleBounceDelay_1.2s_infinite_ease-in-out_both] rotate-[150deg] sk-circle6"/>
      <div
        class="sk-child w-40 h-40 absolute left-0 top-0 before:block before:mx-auto before:w-[15%] before:h-[15%] before:rounded-o before:animate-[sk-circleBounceDelay_1.2s_infinite_ease-in-out_both] rotate-[180deg] sk-circle7"/>
      <div
        class="sk-child w-40 h-40 absolute left-0 top-0 before:block before:mx-auto before:w-[15%] before:h-[15%] before:rounded-o before:animate-[sk-circleBounceDelay_1.2s_infinite_ease-in-out_both] rotate-[210deg] sk-circle8"/>
      <div
        class="sk-child w-40 h-40 absolute left-0 top-0 before:block before:mx-auto before:w-[15%] before:h-[15%] before:rounded-o before:animate-[sk-circleBounceDelay_1.2s_infinite_ease-in-out_both] rotate-[240deg] sk-circle9"/>
      <div
        class="sk-child w-40 h-40 absolute left-0 top-0 before:block before:mx-auto before:w-[15%] before:h-[15%] before:rounded-o before:animate-[sk-circleBounceDelay_1.2s_infinite_ease-in-out_both] rotate-[270deg] sk-circle10"/>
      <div
        class="sk-child w-40 h-40 absolute left-0 top-0 before:block before:mx-auto before:w-[15%] before:h-[15%] before:rounded-o before:animate-[sk-circleBounceDelay_1.2s_infinite_ease-in-out_both] rotate-[300deg] sk-circle11"/>
      <div
        class="sk-child w-40 h-40 absolute left-0 top-0 before:block before:mx-auto before:w-[15%] before:h-[15%] before:rounded-o before:animate-[sk-circleBounceDelay_1.2s_infinite_ease-in-out_both] rotate-[330deg] sk-circle12"/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: 'white',
  }
})
</script>

<style scoped>

.sk-circle.white .sk-child::before{
  background: var(--bc-white)
}
.sk-circle.first .sk-child::before{
  background: var(--bc-first-color)
}
.sk-circle2::before{
  animation-delay: -1.1s
}
.sk-circle3::before{
  animation-delay: -1s
}
.sk-circle4::before{
  animation-delay: -0.9s
}
.sk-circle5::before{
  animation-delay: -0.8s
}
.sk-circle6::before{
  animation-delay: -0.7s
}
.sk-circle7::before{
  animation-delay: -0.6s
}
.sk-circle8::before{
  animation-delay: -0.5s
}
.sk-circle9::before{
  animation-delay: -0.4s
}
.sk-circle10::before{
  animation-delay: -0.3s
}
.sk-circle11::before{
  animation-delay: -0.2s
}
.sk-circle12::before{
  animation-delay: -0.1s
}
</style>

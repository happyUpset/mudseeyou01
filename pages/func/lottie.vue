<template>
  <div class="mx-15 h-1/1 flex justify-center items-center bg-white">
    <div class="">
      <div class="text-2 py-16">使用lottie</div>
      <div class="text-4">使用外部</div>
      <client-only>
        <Vue3Lottie
          class="red"
          animationLink="https://assets10.lottiefiles.com/packages/lf20_soCRuE.json"
          :height="200"
          :width="200"
        />
      </client-only>
      <div class="text-4">使用public內部</div>
      <client-only>
        <Vue3Lottie
          class="red"
          :animationLink="'/lotties/loading.json'"
          :height="200"
          :width="200"
        />
      </client-only>
      <div class="text-4">使用assets內部</div>
      <client-only>
        <Vue3Lottie
          class="red"
          :animationLink="'../assets/lotties/oops.json'"
          :height="200"
          :width="200"
        />
      </client-only>
    </div>
  </div>
</template>

<script setup>


</script>

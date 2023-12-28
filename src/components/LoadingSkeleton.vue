<template>
  <div class="loader-container" :class="props.class">
    <div class="inner-loader" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["class"]);
</script>

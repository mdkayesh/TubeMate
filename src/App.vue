<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1">
      <TopNav />
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import TopNav from "./components/TopNav.vue";
</script>

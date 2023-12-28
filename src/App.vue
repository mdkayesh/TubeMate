<template>
  <div class="flex">
    <Sidebar />
    <div class="w-full md:flex-1">
      <TopNav />
      <MobileCategories />
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import TopNav from "./components/TopNav.vue";
import MobileCategories from "./components/MobileCategories.vue";
</script>

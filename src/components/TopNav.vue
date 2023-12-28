<template>
  <div
    class="topnav sticky top-0 left-0 w-full py-3 px-default bg-bg_secondary z-50 h-[70px] flex justify-between items-center gap-6"
  >
    <div :class="$route.path.includes('watch') ? 'md:block' : 'md:hidden'">
      <Logo />
    </div>
    <nav class="flex justify-end items-center h-full w-full">
      <form
        class="flex items-center rounded-full bg-white pr-3"
        @submit.prevent="handleSubmit"
      >
        <input
          type="text"
          name="search"
          id="search"
          class="py-2 px-5 w-full max-w-sm outline-none bg-transparent text-black"
          placeholder="Search"
          v-model="searchTerms"
        />
        <button type="submit" class="text-primary_1">
          <Icon icon="ic:sharp-search" class="text-3xl" />
        </button>
      </form>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Logo from "./Logo.vue";
import { Icon } from "@iconify/vue";
import router from "@/router";

const searchTerms = ref("");

const handleSubmit = () => {
  router.push({ name: "Search", params: { searchTerms: searchTerms.value } });
};
</script>

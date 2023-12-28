<template>
  <aside
    class="sidebar bg-bg_secondary min-w-[250px] h-screen overflow-auto sticky top-0 left-0 hidden md:block"
    v-if="!$route.path.includes('watch')"
  >
    <div class="sticky top-0 left-0 bg-bg_secondary z-50 px-default">
      <Logo />
    </div>
    <nav class="px-default border-r border-gray-600">
      <ul class="py-4 flex flex-col gap-3">
        <li v-for="(category, index) in categories" :key="category.name">
          <RouterLink
            :to="
              index !== 0
                ? {
                    name: 'Category',
                    params: {
                      category: category.name.toLowerCase(),
                    },
                  }
                : '/'
            "
            class="sidebar-link"
          >
            <div class="icon relative z-10">
              <Icon :icon="category.icon" class="text-4xl" />
            </div>
            <p class="font-semibold relative z-10">{{ category.name }}</p>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { categories } from "../data/data";
import { Icon } from "@iconify/vue";
import Logo from "./Logo.vue";
</script>

<style scoped></style>

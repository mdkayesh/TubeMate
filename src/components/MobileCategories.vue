<template>
  <nav class="px-default md:hidden">
    <ul class="py-4 flex gap-3 w-full overflow-auto">
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
</template>

<script setup lang="ts">
import { categories } from "@/data/data";
import { Icon } from "@iconify/vue";
</script>

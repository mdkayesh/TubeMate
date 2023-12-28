<template>
  <RouterLink class="flex gap-3 flex-col sm:flex-row" :to="`/watch/${videoId}`">
    <img
      :src="medium?.url"
      :alt="title"
      class="w-full sm:w-1/2 rounded-lg sm:max-w-[180px]"
    />
    <div class="content w-full sm:w-2/3 lg:w-1/2">
      <h3 class="line-clamp-2 text-sm">{{ title }}</h3>
      <div
        class="flex items-center gap-x-3 gap-y-1 mt-2 flex-wrap text-xs text-gray-400 font-semibold"
      >
        <p class="flex gap-1 items-center">
          <span>{{ channelTitle }}</span>
          <span><Icon icon="lets-icons:check-fill" /></span>
        </p>
        <p>{{ moment(publishedAt).fromNow() }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import moment from "moment";

const props = defineProps(["video"]);
const video: Video = props?.video;
const {
  id: { videoId },
  snippet: {
    channelTitle,
    thumbnails: { medium },
    publishedAt,
    title,
  },
} = video;
</script>

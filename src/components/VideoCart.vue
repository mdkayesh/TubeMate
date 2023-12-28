<template>
  <RouterLink
    :to="`/watch/${videoId}`"
    class="video-cart bg-bg_secondary transition-all duration-300 hover:scale-105 w-full h-full block"
  >
    <img
      :src="high.url || demoThumbnailUrl"
      :alt="title"
      class="w-full aspect-[3/2] object-cover"
    />

    <div class="content p-4">
      <h2 class="line-clamp-2 text-white">{{ title }}</h2>
      <div
        class="flex items-center gap-3 flex-wrap mt-1.5 text-xs text-gray-400 font-semibold"
      >
        <p class="flex gap-1 items-center">
          <span>{{ channelTitle }}</span>
          <span><Icon icon="lets-icons:check-fill" /></span>
        </p>
        <p>{{ fromNow }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { demoThumbnailUrl } from "../data/data";
import moment from "moment";

const props = defineProps(["video"]);
const data: Video = props?.video;

const {
  id: { videoId },
  snippet: {
    channelTitle,
    thumbnails: { high },
    publishedAt,
    title,
  },
} = data;
const fromNow = moment(publishedAt).fromNow();
</script>

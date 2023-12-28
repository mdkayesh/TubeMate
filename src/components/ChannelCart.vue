<template>
  <RouterLink
    :to="`/channel/${channelId}`"
    class="channel-cart bg-bg_secondary transition-all duration-300 hover:scale-105 w-full h-full block"
  >
    <img
      :src="high.url || demoThumbnailUrl"
      :alt="title"
      class="w-40 mx-auto p-4 aspect-square object-cover rounded-full"
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

const props = defineProps(["channel"]);
const channel: Channel = props?.channel;
const {
  id: { channelId },
  snippet: {
    channelTitle,
    thumbnails: { high },
    publishedAt,
    title,
  },
} = channel;

const fromNow = moment(publishedAt).fromNow();
</script>

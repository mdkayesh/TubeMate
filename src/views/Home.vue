<template>
  <div class="container py-10">
    <h1 class="text-3xl font-bold">
      New <span class="text-gradient">Videos</span>
    </h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6 mt-10"
    >
      <div
        class="bg-bg_secondary"
        v-for="item in [...Array(20)]"
        :key="item"
        v-if="!videos"
      >
        <LoadingSkeleton class="aspect-[3/2]" />
        <div class="p-4">
          <LoadingSkeleton class="rounded-full w-full h-5" />
          <LoadingSkeleton class="rounded-full w-full max-w-[150px] h-5 mt-3" />
          <LoadingSkeleton class="rounded-full w-full max-w-[170px] h-3 mt-3" />
        </div>
      </div>
      <div v-for="(video, i) in videos" :key="i" v-else>
        <VideoCart :video="video" v-if="video.id.kind === 'youtube#video'" />
        <ChannelCart v-else :channel="video" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoCart from "@/components/VideoCart.vue";
import ChannelCart from "@/components/ChannelCart.vue";
import { Ref, ref } from "vue";
import fetchDataFromApi from "@/api/api";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";

const videos: Ref<null | Video[] | Channel[]> = ref(null);

const getVideos = async () => {
  try {
    const data = await fetchDataFromApi("/search", {
      q: "New",
      part: "snippet,id",
    });
    videos.value = data.items;
  } catch (error) {
    console.log(error);
  }
};

getVideos();
</script>

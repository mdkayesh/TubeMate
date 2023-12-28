<template>
  <section class="py-10 container">
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
  </section>
</template>

<script setup lang="ts">
import fetchDataFromApi from "@/api/api";
import ChannelCart from "@/components/ChannelCart.vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import VideoCart from "@/components/VideoCart.vue";
import { Ref, ref } from "vue";

const props = defineProps(["searchTerms"]);
const videos: Ref<null | Video[] | Channel[]> = ref(null);

const getData = async () => {
  try {
    const data = await fetchDataFromApi("/search", {
      q: props.searchTerms,
      part: "snippet,id",
    });
    videos.value = data.items;
  } catch (error) {
    console.log(error);
  }
};

getData();
</script>

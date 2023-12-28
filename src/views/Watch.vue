<template>
  <div class="flex gap-8 container py-8 flex-col lg:flex-row">
    <!-- loading -->
    <div class="loading w-full lg:w-2/3" v-if="!videoDetails">
      <LoadingSkeleton class="aspect-video w-full" />
      <LoadingSkeleton class="w-full mt-6 h-7 rounded-full" />
      <LoadingSkeleton class="w-full mt-4 h-7 rounded-full max-w-[300px]" />
      <div class="flex justify-between items-center gap-4 flex-wrap">
        <LoadingSkeleton class="w-full mt-6 h-5 max-w-[200px] rounded-full" />

        <div class="flex gap-5 flex-wrap">
          <LoadingSkeleton class="mt-6 h-5 w-24 rounded-full" />
          <LoadingSkeleton class="mt-6 h-5 w-24 rounded-full" />
        </div>
      </div>
    </div>

    <!-- video player -->

    <div class="video-player w-full lg:w-2/3" v-else>
      <iframe
        :src="`https://www.youtube.com/embed/${props.videoId}`"
        :title="videoDetails.snippet.title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="w-full aspect-video"
      ></iframe>
      <h2 class="text-xl mt-5 font-semibold">
        {{ videoDetails?.snippet?.title }}
      </h2>
      <div
        class="flex justify-between items-center text-gray-400 mt-3 gap-4 flex-wrap"
      >
        <div class="flex items-center gap-3 flex-wrap text-base font-semibold">
          <div class="flex gap-1 items-center hover:text-white">
            <RouterLink :to="`/channel/${videoDetails?.snippet?.channelId}`">{{
              videoDetails?.snippet?.channelTitle
            }}</RouterLink>
            <span><Icon icon="lets-icons:check-fill" /></span>
          </div>
          <p>{{ moment(videoDetails?.snippet?.publishedAt).fromNow() }}</p>
        </div>

        <div class="flex gap-4 items-center">
          <div class="flex gap-1 items-center font-semibold">
            <span class="text-lg">{{
              formatNumber(Number(videoDetails?.statistics?.viewCount))
            }}</span>
            <span>views</span>
          </div>
          <div class="flex gap-1 items-center font-semibold">
            <span class="text-lg">{{
              formatNumber(Number(videoDetails?.statistics?.likeCount))
            }}</span>
            <span>likes</span>
          </div>
        </div>
      </div>
      <div class="overflow-hidden mt-5 w-full p-5 bg-gray-800 rounded-lg">
        <div :class="seeMore ? '' : 'line-clamp-4'">
          {{ videoDetails?.snippet?.description }}
        </div>
        <button
          type="button"
          class="font-semibold mt-1 hover:underline"
          @click="seeMore = !seeMore"
        >
          {{ seeMore ? "See Less" : "See More" }}
        </button>
      </div>
    </div>

    <!-- suggested -->
    <div class="suggested w-full lg:w-1/3">
      <!-- loading -->
      <div class="flex flex-col gap-4 w-full">
        <div
          class="flex gap-3 flex-col sm:flex-row"
          v-if="!videos"
          v-for="_ in [...Array(20)]"
        >
          <LoadingSkeleton
            class="w-full sm:w-1/2 rounded-lg sm:max-w-[180px] aspect-[3/2] min-h-[90px]"
          />
          <div class="w-full sm:w-2/3 lg:w-1/2">
            <LoadingSkeleton class="w-full h-4 rounded-full" />
            <LoadingSkeleton
              class="w-full h-4 max-w-[200px] lg:max-w-14 mt-3 rounded-full"
            />
            <LoadingSkeleton class="w-full h-3 max-w-20 mt-3 rounded-full" />
          </div>
        </div>
        <!-- videos -->
        <div v-for="video in videos" v-else>
          <RecomentedVideoCart :video="video" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RecomentedVideoCart from "./RecomentedVideoCart.vue";
import { Icon } from "@iconify/vue";
import { formatNumber } from "../utils/functions";
import moment from "moment";
import { Ref, ref } from "vue";
import fetchDataFromApi from "@/api/api";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";

const props = defineProps(["videoId"]);
const seeMore = ref(false);
const videoDetails: Ref<null | VideoDetails> = ref(null);
const videos: Ref<null | Video[]> = ref(null);

const getVideoDetails = async () => {
  try {
    const data = await fetchDataFromApi("/videos", {
      part: "contentDetails,snippet,statistics",
      id: props.videoId,
    });

    const recomended = await fetchDataFromApi("/search", {
      relatedToVideoId: props.videoId,
      part: "id,snippet",
      type: "video",
    });

    videoDetails.value = data.items[0];
    videos.value = recomended?.items;
  } catch (error) {
    console.log(error);
  }
};

getVideoDetails();
</script>

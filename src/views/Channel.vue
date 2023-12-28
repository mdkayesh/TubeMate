<template>
  <section class="channel container pb-10">
    <!-- loading -->

    <div v-if="!channelDetails">
      <LoadingSkeleton
        class="aspect-[3/2] max-h-[200px] w-full bg-cover bg-no-repeat bg-center overflow-hidden rounded-lg mt-2"
      />

      <div class="flex gap-7 flex-col sm:flex-row items-center mt-7">
        <LoadingSkeleton class="rounded-full w-[200px] aspect-square" />
        <div class="flex-1 flex flex-col items-center w-full sm:items-start">
          <LoadingSkeleton class="rounded-full w-full max-w-[250px] h-7" />
          <LoadingSkeleton class="rounded-full w-full max-w-[300px] h-5 mt-4" />
          <LoadingSkeleton class="rounded-full w-full h-5 mt-4" />
        </div>
      </div>
    </div>

    <div v-else>
      <div
        class="aspect-[3/2] max-h-[200px] w-full bg-cover bg-no-repeat bg-center overflow-hidden rounded-lg mt-2"
        :style="{
          backgroundImage: `url(${channelDetails?.brandingSettings?.image?.bannerExternalUrl})`,
        }"
      ></div>
      <div
        class="flex gap-7 flex-col sm:flex-row text-center sm:text-left items-center mt-7"
      >
        <div>
          <img
            :src="channelDetails?.snippet?.thumbnails?.high?.url"
            :alt="channelDetails?.snippet?.title"
            class="rounded-full w-[200px]"
          />
        </div>
        <div class="flex-1">
          <div
            class="flex gap-1 justify-center text-center sm:justify-start sm:text-left"
          >
            <h1 class="text-3xl font-semibold">
              {{ channelDetails?.snippet?.title }}
            </h1>
            <span class="mt-1 text-gray-400"
              ><Icon icon="lets-icons:check-fill"
            /></span>
          </div>
          <p
            class="flex gap-2 text-gray-400 items-center mt-1 justify-center text-center sm:justify-start sm:text-center flex-wrap"
          >
            <span>{{ channelDetails?.snippet?.customUrl }}</span>
            <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
            <span
              >{{
                formatNumber(
                  Number(channelDetails?.statistics?.subscriberCount)
                )
              }}
              subscribers</span
            >
            <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
            <span
              >{{
                formatNumber(Number(channelDetails?.statistics?.videoCount))
              }}
              videos</span
            >
          </p>
          <p class="text-gray-400 line-clamp-1 mt-2">
            {{ channelDetails?.snippet?.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- videos -->

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
      <!--  -->

      <div v-for="(video, i) in videos" :key="i">
        <VideoCart :video="video" v-if="video.id.kind === 'youtube#video'" />
        <ChannelCart v-else :channel="video" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { formatNumber } from "@/utils/functions";
import { Icon } from "@iconify/vue";
import VideoCart from "@/components/VideoCart.vue";
import ChannelCart from "@/components/ChannelCart.vue";
import { Ref, ref } from "vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import fetchDataFromApi from "@/api/api";

const props = defineProps(["channelId"]);
const channelDetails: Ref<null | ChannelDetails> = ref(null);
const videos: Ref<null | Video[]> = ref(null);

const getData = async () => {
  try {
    const data = await fetchDataFromApi("/channels", {
      part: "snippet,statistics",
      id: props.channelId,
    });
    const _data = await fetchDataFromApi("/search", {
      channelId: props.channelId,
      part: "snippet,id",
      order: "date",
    });

    channelDetails.value = data.items[0];
    videos.value = _data.items;
  } catch (error) {
    console.log(error);
  }
};

getData();
</script>

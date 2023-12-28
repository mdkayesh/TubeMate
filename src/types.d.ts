type Video = {
  kind: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumb;
      medium: Thumb;
      high: Thumb;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};

type Channel = {
  kind: string;
  id: {
    kind: string;
    channelId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumb;
      medium: Thumb;
      high: Thumb;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};

type Thumb = {
  url: string;
  width?: number;
  height?: number;
};

// video details

type VideoDetails = {
  kind: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumb;
      medium: Thumb;
      high: Thumb;
      standard: Thumb;
      maxres: Thumb;
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
  };
  contentDetails: ContentDetails;
  statistics: Statistics;
};

type ContentDetails = {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  regionRestriction: {
    blocked: string[];
  };
  contentRating: {};
  projection: string;
};

type Statistics = {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
};

// channel details

type ChannelDetails = {
  kind: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      default: Thumb;
      medium: Thumb;
      high: Thumb;
    };
  };

  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
  brandingSettings: {
    channel: {
      title: string;
      description: string;
      keywords: string;
      unsubscribedTrailer: string;
    };
    image: {
      bannerExternalUrl: string;
    };
  };
};

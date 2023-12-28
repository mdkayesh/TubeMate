import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_URL;
const API_KEY = process.env.VUE_APP_API_KEY;
const API_HOST = process.env.VUE_APP_API_HOST;

type Params = {
  q?: string;
  id?: string;
  part?: string;
  maxResults?: number;
  regionCode?: string;
  order?: string;
  relatedToVideoId?: string;
  type?: string;
  channelId?: string;
};

const fetchDataFromApi = async (endpoint: string, params: Params) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
      params: {
        ...params,
        regionCode: "BD",
        maxResults: "50",
        order: "date",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export default fetchDataFromApi;

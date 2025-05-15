// // services/api.ts
// import axios from "axios";
// import * as Network from "expo-network";
// // import { saveAlbums, getAlbums } from "./database";

// const API_URL = "https://itunes.apple.com/search?term=jack+johnson";

// export const fetchAlbums = async (artist: string = "jack+johnson") => {
//   try {
//     const networkState = await Network.getNetworkStateAsync();

//     const response = await axios.get(API_URL, {
//       params: { term: artist, entity: "album" },
//     });

//     if (response.data.results) {
//       // await saveAlbums(response.data.results);
//     }

//     return response.data.results || [];
//     //   if (networkState.isInternetReachable) {
//     // } else {
//     //   return await getAlbums();
//     // }
//   } catch (error) {
//     console.error("Error fetching albums:", error);
//     // return await getAlbums();
//   }
// };


import axios from "axios";
import * as Network from "expo-network";
import { saveAlbums, getAlbums } from "./database";

const API_URL = "https://itunes.apple.com/search?term=jack+johnson";

export const fetchAlbums = async (artist: string = "jack johnson") => {
  try {
    const networkState = await Network.getNetworkStateAsync();

    if (networkState.isInternetReachable) {
      const response = await axios.get(API_URL, {
        params: { term: artist, entity: "album" },
      });

      if (response.data.results) {
        await saveAlbums(response.data.results);
        return response.data.results;
      }

      return [];
    } else {
      return await getAlbums();
    }
  } catch (error) {
    console.error("Error fetching albums:", error);
    return await getAlbums();
  }
};

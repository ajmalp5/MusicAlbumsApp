import * as FileSystem from "expo-file-system";
import { useState, useEffect } from "react";
import { Image, Text } from "react-native";


const generateUniqueFileName = (uri: string) => {
    return encodeURIComponent(uri);
  };
  

const cacheImage = async (uri: string | undefined) => {
    try {
      console.log(uri, "uriuriuriuri");
  
      if (!uri) {
        console.error("Invalid URI:", uri);
        throw new Error("URI is undefined or null");
      }
  
      // Ensure documentDirectory is not null
      if (!FileSystem.documentDirectory) {
        throw new Error("Document directory is unavailable");
      }
  
      // Generate a unique file name using the hash or other unique part of the URI
      const fileName = generateUniqueFileName(uri) + ".jpg";
      const fileUri = FileSystem.documentDirectory + fileName;

      console.log(fileUri)
  
      // Check if the file already exists in cache
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      
      if (fileInfo.exists) {
        return fileUri;
      }

      const downloadResult = await FileSystem.downloadAsync(uri, fileUri);
      return downloadResult.uri;
    } catch (error) {
      console.error("Error caching image:", error);
      return null;
    }
  };
  
export const CachedImage = ({
  imageUri,
  style,
}: {
  imageUri: string;
  style: any;
}) => {
  const [cachedUri, setCachedUri] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const cachedImageUri = await cacheImage(imageUri);
      setCachedUri(cachedImageUri);
    };

    fetchImage();
  }, [imageUri]);

  // If the image is cached, render it; otherwise, show a fallback
  return cachedUri ? (
    <Image
      source={{ uri: cachedUri }}
      style={{ width: 100, height: 100, ...style }}
    />
  ) : (
    <Text>Loading...</Text>
  );
};

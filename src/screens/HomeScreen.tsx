// screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
  SafeAreaView,
} from "react-native";
import { fetchAlbums } from "../services/api";
import AlbumList from "../components/AlbumList";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { getAlbums, saveAlbums } from "../services/database";

const HomeScreen = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useNetworkStatus(() => {
  //   if (!loading) {
  //     fetchAlbums().then(setAlbums);
  //   }
  // });

  const aa = async () => {
    // saveAlbums([
    //   {
    //     trackId: 123456789,
    //     trackName: "Dummy Song",
    //     artistName: "John Doe",
    //     artworkUrl100: "https://example.com/artwork.jpg",
    //   },
    //   {
    //     trackId: 987654321,
    //     trackName: "Another Track",
    //     artistName: "Jane Smith",
    //     artworkUrl100: "https://example.com/another-artwork.jpg",
    //   },
    // ]);

    const res = await getAlbums();
    console.log(res, "TEST");
  };

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const data = await fetchAlbums();

        console.log(JSON.stringify(data, null, 2));
        setAlbums(data);
      } catch (err) {
        setError("Failed to load albums");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          aa();
        }}
      >
        <Text>Clieck</Text>
      </Pressable>
      <AlbumList albums={albums} onPress={undefined} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;

// components/AlbumList.tsx
import { FlashList } from '@shopify/flash-list';
import { RFValue } from 'react-native-responsive-fontsize';
import { StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import { CachedImage } from './CachedImage';

const AlbumList = ({ albums, onPress }) => {
  
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      
      <CachedImage 
        imageUri={item.artworkUrl100} 
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{item.collectionName}</Text>
    </View>
  );

  return (
    <FlashList
      data={albums}
      renderItem={renderItem}
      estimatedItemSize={100}
      // numColumns={2}
    />
  );
};

export default AlbumList;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: RFValue(8),
    alignItems: 'center',
  },
  thumbnail: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: RFValue(8),
  },
  title: {
    fontSize: RFValue(12),
    marginTop: RFValue(4),
    textAlign: 'center',
  },
});
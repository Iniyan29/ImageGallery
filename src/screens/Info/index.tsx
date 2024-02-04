import { View, Image, StyleSheet, Text } from 'react-native';
import React from 'react';

const InfoScreen = ({ route }) => {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image.download_url }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.author}>{image.author}</Text>
        <Text style={styles.description}>Visit: {image.url}</Text>
        <Text style={styles.dimensions}>
          Dimensions: {image.width} x {image.height}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 2, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%', 
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  author: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    color: 'blue',
  },
  dimensions: {
    fontSize: 14,
    color: 'gray',
  },
});

export { InfoScreen };

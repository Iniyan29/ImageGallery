import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';

const API_BASE_URL = 'https://picsum.photos/v2';

interface ImageListProps {
  onSelectImage: (id: string) => void;
  searchId: string;
}

const sliderWidth = Dimensions.get('window').width;
const itemWidth = sliderWidth - 100;

const ImageList: React.FC<ImageListProps> = ({searchId}: any) => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    scrollToItem(searchId);
  }, [searchId]);

  const scrollToItem = (id: string) => {
    const index = images.findIndex(image => image.id === id);
    if (carouselRef.current) {
      carouselRef.current.snapToItem(index);
    }
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/list`);
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image source={{uri: item.download_url}} style={styles.slide} />
      </View>
    );
  };

  const handleOnPress = () => {
    const currentIndex = carouselRef.current?.currentIndex;
    if (currentIndex !== undefined && images[currentIndex]) {
      navigation.navigate('Info', {image: images[currentIndex]});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        ) : (
          <>
            <Carousel
              ref={carouselRef}
              data={images}
              renderItem={renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              layout={'stack'}
              layoutCardOffset={30}
              firstItem={images.length - 1}
              containerCustomStyle={{
                transform: [{scaleX: -1}],
              }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleOnPress}>
                <Text style={styles.buttonText}>Info</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  slide: {
    width: itemWidth,
    height: 400,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    // marginLeft: 20,
  },
  button: {
    height: 50,
    width: '500%',
    borderRadius: 10,
    backgroundColor: '#F2F3F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 26,
    color: 'black',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {ImageList};

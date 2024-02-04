import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Text} from 'react-native-elements';
import axios from 'axios';
import {ImageList, SearchInput} from '../../components';

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const fetchImageInfo = async (id: string) => {
    try {
      const response = await axios.get(`https://picsum.photos/id/${id}/info`);
      setSelectedImage(response.data);
    } catch (error) {
      console.error('Error fetching image info:', error);
    }
  };

  return (
    <View style={{flex: 1, padding: 30 ,backgroundColor:'white'}}>
      <Text h3 style={{textAlign: 'center', marginVertical: 20}}>
        Image Gallery
      </Text>
      <SearchInput onSearch={fetchImageInfo} />
      <ImageList onSelectImage={fetchImageInfo} searchId={selectedImage?.id} />
    </View>
  );
};

export {Home};

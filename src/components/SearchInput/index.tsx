// SearchInput.tsx
import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {icons} from '../../Assets/Icons';

interface SearchInputProps {
  onSearch: (id: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({onSearch}) => {
  const [searchId, setSearchId] = useState('');

  return (
    <View style={{flexDirection: 'row', marginTop: 10}}>
      <TextInput
        placeholder="Search"
        value={searchId}
        onChangeText={text => setSearchId(text)}
        keyboardType="numeric"
        style={styles.search}
      />
      <TouchableOpacity style={styles.icon} onPress={() => onSearch(searchId)}>
        <Image source={icons.search} style={styles.iconImage} tintColor={'grey'}></Image>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  search: {
    height: 60,
    flex: 1,
    backgroundColor: '#F2F3F4',
    borderRadius:10,
    fontSize: 20,
    padding: 20,
  },
  icon: {
    height: 60,
    width: 60,
    backgroundColor: '#F2F3F4',
    borderRadius: 10,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});
export {SearchInput};

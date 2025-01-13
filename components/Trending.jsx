import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants'; // Ensure your icons file is correctly set up

// ErrorBoundary component to catch errors
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Text>Error occurred!</Text>;
    }
    return this.props.children;
  }
}

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const isActive = activeItem === item.$id;

  return (
    <Animatable.View
      style={[
        styles.trendingItem,
        isActive ? styles.activeTrendingItem : styles.inactiveTrendingItem,
      ]}
    >
      {play ? (
        <Text style={styles.playingText}>Playing</Text>
      ) : (
        <TouchableOpacity
          style={styles.touchable}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item?.thumbnail,
            }}
            style={[
              styles.imageBackground,
              isActive
                ? styles.activeImageBackground
                : styles.inactiveImageBackground,
            ]}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            style={styles.playIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts = [] }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0]?.key);
    }
  };

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id.toString()}
          renderItem={({ item }) => (
            <TrendingItem activeItem={activeItem} item={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 70,
          }}
        />
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  flatListContent: {
    paddingVertical: 8,
  },
  trendingItem: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTrendingItem: {
    transform: [{ scale: 1.1 }],
  },
  inactiveTrendingItem: {
    transform: [{ scale: 0.9 }],
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageBackground: {
    borderRadius: 33,
    marginVertical: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  activeImageBackground: {
    width: 220,
    height: 308,
  },
  inactiveImageBackground: {
    width: 200,
    height: 288,
  },
  playIcon: {
    width: 48,
    height: 48,
    position: 'absolute',
  },
  playingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Trending;